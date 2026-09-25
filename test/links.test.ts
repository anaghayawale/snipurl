import { describe, expect, it } from "vitest";

import { LinkService } from "../src/links";

describe("LinkService", () => {
  it("creates unique links with zero clicks", () => {
    const codes = ["AAAAAAA", "BBBBBBB"];
    const service = new LinkService(() => codes.shift() ?? "ZZZZZZZ", () => new Date("2026-01-01T00:00:00.000Z"));

    const first = service.create(new URL("https://example.com/one"));
    const second = service.create(new URL("https://example.com/two"));

    expect(first).toEqual({
      kind: "created",
      value: {
        code: "AAAAAAA",
        url: "https://example.com/one",
        createdAt: "2026-01-01T00:00:00.000Z",
        clickCount: 0,
      },
    });
    expect(second).toMatchObject({ kind: "created", value: { code: "BBBBBBB", clickCount: 0 } });
  });

  it("retries a collision and creates a link with a later candidate", () => {
    const codes = ["AAAAAAA", "AAAAAAA", "BBBBBBB"];
    const service = new LinkService(() => codes.shift() ?? "ZZZZZZZ");

    service.create(new URL("https://example.com/one"));
    const result = service.create(new URL("https://example.com/two"));

    expect(result).toMatchObject({ kind: "created", value: { code: "BBBBBBB" } });
  });

  it("fails without mutation after five collisions", () => {
    const service = new LinkService(() => "AAAAAAA");

    service.create(new URL("https://example.com/one"));
    expect(service.create(new URL("https://example.com/two"))).toEqual({ kind: "collision_exhausted" });
    expect(service.getMetadata("AAAAAAA")?.url).toBe("https://example.com/one");
  });

  it("increments only when resolving a known link", () => {
    const service = new LinkService(() => "AAAAAAA");
    service.create(new URL("https://example.com/one"));

    expect(service.getMetadata("AAAAAAA")?.clickCount).toBe(0);
    expect(service.resolveAndCount("AAAAAAA")?.clickCount).toBe(1);
    expect(service.getMetadata("AAAAAAA")?.clickCount).toBe(1);
    expect(service.resolveAndCount("BBBBBBB")).toBeUndefined();
  });
});
