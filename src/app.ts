import express, { type Express } from "express";

import { generateShortCode } from "./codes";
import { LinkService } from "./links";
import { createRateLimiter, globalErrorHandler, requestContext } from "./middleware";
import { createUrlSchema, isValidCode, parseDestinationUrl } from "./validation";

function notFound(response: express.Response): void {
  response.status(404).json({ error: "not_found", requestId: response.locals.requestId });
}

export function createApp(linkService = new LinkService(generateShortCode)): Express {
  const app = express();

  app.disable("x-powered-by");
  app.use(requestContext);
  app.use(express.json({ limit: "4kb" }));
  app.use(createRateLimiter());

  app.post("/api/urls", (request, response) => {
    const body = createUrlSchema.safeParse(request.body);
    const destinationUrl = body.success ? parseDestinationUrl(body.data.url) : undefined;

    if (!destinationUrl) {
      response.status(400).json({ error: "invalid_request", requestId: response.locals.requestId });
      return;
    }

    const result = linkService.create(destinationUrl);

    if (result.kind === "collision_exhausted") {
      response.status(500).json({ error: "internal_error", requestId: response.locals.requestId });
      return;
    }

    response.status(201).json(result.value);
  });

  app.get("/api/urls/:code", (request, response) => {
    if (!isValidCode(request.params.code)) {
      notFound(response);
      return;
    }

    const metadata = linkService.getMetadata(request.params.code);

    if (!metadata) {
      notFound(response);
      return;
    }

    response.json(metadata);
  });

  app.get("/:code", (request, response) => {
    if (!isValidCode(request.params.code)) {
      notFound(response);
      return;
    }

    const record = linkService.resolveAndCount(request.params.code);

    if (!record) {
      notFound(response);
      return;
    }

    response.redirect(302, record.destinationUrl);
  });

  app.use(globalErrorHandler);
  return app;
}
