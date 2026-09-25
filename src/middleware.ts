import { randomUUID } from "node:crypto";

import type { ErrorRequestHandler, RequestHandler } from "express";
import rateLimit from "express-rate-limit";
import pino from "pino";

const safeRequestId = /^[A-Za-z0-9_-]{8,128}$/;
const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });

export const requestContext: RequestHandler = (request, response, next) => {
  const supplied = request.header("x-request-id");
  const requestId = supplied && safeRequestId.test(supplied) ? supplied : randomUUID();

  response.locals.requestId = requestId;
  response.setHeader("X-Request-Id", requestId);
  next();
};

export function createRateLimiter(): RequestHandler {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (_request, response) => {
      response.status(429).json({ error: "rate_limited", requestId: response.locals.requestId });
    },
  });
}

export const globalErrorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const requestId = response.locals.requestId;
  const status = typeof error?.status === "number" ? error.status : 500;
  const errorType = error instanceof Error ? error.name : "UnknownError";

  logger.error({ requestId, status, errorType }, "Request failed");

  if (response.headersSent) {
    return;
  }

  if (status === 413) {
    response.status(413).json({ error: "invalid_request", requestId });
    return;
  }

  if (status >= 400 && status < 500) {
    response.status(400).json({ error: "invalid_request", requestId });
    return;
  }

  response.status(500).json({ error: "internal_error", requestId });
};
