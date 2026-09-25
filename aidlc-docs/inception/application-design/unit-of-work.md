# Unit of Work: URL Shortener API

## Unit Definition

- **Name**: `url-shortener-api`
- **Type**: Single deployable API service and sole construction unit.
- **Purpose**: Create server-generated short codes for validated HTTP(S) URLs, redirect known codes with HTTP 302, and expose click-count metadata.

## Responsibilities

- Implement the three approved public endpoints.
- Validate destination URLs, short-code parameters, and request size.
- Generate unique random codes and maintain in-memory link records.
- Increment click counts exactly once on a resolved redirect.
- Apply 100 requests per client IP per 15 minutes across public endpoints.
- Return generic safe errors and avoid logging raw destination URLs.
- Supply automated tests and current README instructions.

## Included Internal Responsibilities

The unit contains the compact design's HTTP API, request validation, Link Service, in-memory repository, short-code generator, and public-safety middleware. These are logical modules within one service, not separate units or deployables.

## Greenfield Code Organization

```text
src/
  app.ts                 Express application and route registration
  server.ts              Local process startup
  validation.ts          URL and short-code validation
  links.ts               Link service and in-memory repository
  codes.ts               Random short-code generation
  middleware.ts          Rate limit and safe error middleware
test/
  app.test.ts            HTTP-level automated tests
```

The layout is intentionally compact while keeping each cross-cutting responsibility focused and independently testable.

## Unit Boundary

There are no external services, databases, queues, or client packages. In-memory state is intentionally local to the unit and disappears when the process restarts.
