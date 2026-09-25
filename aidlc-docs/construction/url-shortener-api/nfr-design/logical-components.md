# NFR Logical Components: URL Shortener API

## Request Context Middleware

**Responsibility**: Create or safely accept a request identifier, attach it to request context, set `X-Request-Id`, and make it available to logs and errors.

**Inputs**: Optional client-provided request-ID header.

**Outputs**: Valid request ID on the request context and response header.

## Rate-Limit Middleware

**Responsibility**: Enforce the global per-IP 100-request, 15-minute policy before public handlers.

**Inputs**: Client IP and current process-local limiter state.

**Outputs**: Pass-through or safe 429 response.

## Validation Boundary

**Responsibility**: Enforce JSON body size, schema shape, HTTP(S) destination, URL length, and code format.

**Inputs**: Parsed request body and path parameters.

**Outputs**: Validated domain inputs or safe client errors.

## Structured Logger

**Responsibility**: Emit structured events with timestamp, request ID, log level, and message. Do not emit raw destination URLs, bodies, secrets, or internal stack traces to callers.

**Inputs**: Safe event category and request context.

**Outputs**: Local structured process logs for this scoped release.

## Global Error Handler

**Responsibility**: Catch unexpected errors after routes and return a generic failure response while logging safe diagnostic context.

**Inputs**: Error category and request context.

**Outputs**: Generic 500 JSON response with `X-Request-Id` retained.

## Interaction Sequence

1. Request Context Middleware assigns the request ID.
2. Rate-Limit Middleware permits or rejects the request.
3. Validation Boundary permits validated input or returns a client error.
4. A route invokes business logic.
5. Structured Logger records safe operational events when needed.
6. Global Error Handler catches unexpected failures.

No queue, cache, circuit breaker, external logging service, database, or separate infrastructure component is introduced.
