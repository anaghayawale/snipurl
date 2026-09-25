import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../src/app";
import { LinkService } from "../src/links";

function appWithCodes(...codes: string[]) {
  const service = new LinkService(() => codes.shift() ?? "ZZZZZZZ", () => new Date("2026-01-01T00:00:00.000Z"));
  return createApp(service);
}

describe("SnipURL API", () => {
  it("creates a link and returns metadata", async () => {
    const response = await request(appWithCodes("AAAAAAA"))
      .post("/api/urls")
      .send({ url: "https://example.com/resource" })
      .expect(201);

    expect(response.body).toEqual({
      code: "AAAAAAA",
      url: "https://example.com/resource",
      createdAt: "2026-01-01T00:00:00.000Z",
      clickCount: 0,
    });
    expect(response.headers["x-request-id"]).toBeTruthy();
  });

  it("rejects malformed, non-HTTP(S), oversized, and extra-field requests", async () => {
    const app = appWithCodes("AAAAAAA");

    await request(app).post("/api/urls").send({ url: "ftp://example.com" }).expect(400);
    await request(app).post("/api/urls").send({ url: "relative/path" }).expect(400);
    await request(app).post("/api/urls").send({ url: "https://example.com", alias: "custom" }).expect(400);
    await request(app).post("/api/urls").send({ url: `https://example.com/${"a".repeat(2049)}` }).expect(400);
  });

  it("redirects a known code and increments its click count once", async () => {
    const app = appWithCodes("AAAAAAA");
    await request(app).post("/api/urls").send({ url: "https://example.com/path" }).expect(201);

    await request(app).get("/AAAAAAA").redirects(0).expect(302).expect("Location", "https://example.com/path");

    const metadata = await request(app).get("/api/urls/AAAAAAA").expect(200);
    expect(metadata.body.clickCount).toBe(1);
  });

  it("returns safe not-found responses without changing state", async () => {
    const app = appWithCodes("AAAAAAA");

    const redirectMiss = await request(app).get("/unknown").expect(404);
    const metadataMiss = await request(app).get("/api/urls/BBBBBBB").expect(404);

    expect(redirectMiss.body).toEqual({ error: "not_found", requestId: expect.any(String) });
    expect(metadataMiss.body).toEqual({ error: "not_found", requestId: expect.any(String) });
  });

  it("accepts safe supplied request IDs and replaces unsafe values", async () => {
    const app = appWithCodes("AAAAAAA", "BBBBBBB");

    const accepted = await request(app)
      .post("/api/urls")
      .set("X-Request-Id", "safe_request-123")
      .send({ url: "https://example.com/one" })
      .expect(201);
    const replaced = await request(app)
      .post("/api/urls")
      .set("X-Request-Id", "not safe!")
      .send({ url: "https://example.com/two" })
      .expect(201);

    expect(accepted.headers["x-request-id"]).toBe("safe_request-123");
    expect(replaced.headers["x-request-id"]).not.toBe("not safe!");
  });

  it("rate limits the 101st request in a 15-minute window", async () => {
    const app = appWithCodes("AAAAAAA");

    for (let count = 0; count < 100; count += 1) {
      await request(app).get("/unknown").expect(404);
    }

    const response = await request(app).get("/unknown").expect(429);
    expect(response.body.error).toBe("rate_limited");
  });

  it("returns a generic failure when generation unexpectedly fails", async () => {
    const app = createApp(new LinkService(() => {
      throw new Error("unexpected generator failure");
    }));

    const response = await request(app).post("/api/urls").send({ url: "https://example.com" }).expect(500);
    expect(response.body).toEqual({ error: "internal_error", requestId: expect.any(String) });
  });
});
