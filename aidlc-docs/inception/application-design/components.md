# Application Components

## Design Style

The approved design is compact: the initial implementation may keep the following components in one Express application module, while retaining their interfaces as distinct internal responsibilities. This preserves a small repository without coupling route behavior, validation, storage, and error handling into untestable code.

## HTTP API Component

**Purpose**: Expose the public endpoints and map HTTP input and output to application operations.

**Responsibilities**:

- Register `POST /api/urls`, `GET /api/urls/:code`, and `GET /:code`.
- Return JSON for creation, metadata, validation, not-found, rate-limit, and unexpected-error responses.
- Issue the HTTP 302 redirect response for a resolved short code.

**Interfaces**: Express request handlers that call the Link Service after middleware validation and rate-limit checks.

## Request Validation Component

**Purpose**: Reject invalid request bodies and route parameters before application processing.

**Responsibilities**:

- Validate `url` type, maximum length, absolute format, and `http` or `https` protocol.
- Validate short-code format and maximum length.
- Apply a request-body size limit.

**Interfaces**: Pure validation functions returning typed success or safe validation-error results.

## Link Service Component

**Purpose**: Orchestrate creation, lookup, click tracking, and metadata conversion.

**Responsibilities**:

- Coordinate validation, random code generation, and repository writes.
- Resolve a code for redirect and increment its count exactly once before returning the destination.
- Retrieve safe metadata for an existing code.

**Interfaces**: Methods for create, resolve-and-count, and get-metadata operations.

## In-Memory Link Repository Component

**Purpose**: Own the in-process collection of URL records.

**Responsibilities**:

- Store and retrieve records by code.
- Guarantee a repository lookup is used before a code is accepted as unique.
- Increment a stored click count synchronously within the Node.js process.

**Interfaces**: Methods for existence checks, inserts, record lookup, and click increments.

## Short-Code Generator Component

**Purpose**: Produce random URL-safe candidate codes.

**Responsibilities**:

- Generate candidates from a cryptographically appropriate Node.js source.
- Leave collision checking to the Link Service and repository.

**Interfaces**: A no-argument method returning a code candidate.

## Public Safety Middleware Component

**Purpose**: Enforce public-route protection and safe failure behavior.

**Responsibilities**:

- Apply 100 requests per client IP per 15-minute window across all public endpoints.
- Provide a generic rate-limit response.
- Install a global error handler that logs only non-sensitive operational context and returns a generic failure response.

**Interfaces**: Express middleware and an Express error-handler middleware.
