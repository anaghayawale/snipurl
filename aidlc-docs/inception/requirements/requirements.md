# URL Shortener API Requirements

## Intent Analysis

- **User request**: Build a URL shortener API that creates short codes for long URLs, redirects each short code, tracks clicks, follows AI-DLC approval gates, and keeps the repository README current.
- **Request type**: New project.
- **Scope estimate**: Multiple components within one API service: HTTP routing, URL validation, short-code generation, in-memory storage, click accounting, and tests.
- **Complexity estimate**: Standard. The service is deliberately small, but redirects of user-supplied URLs require clear validation and abuse controls.

## Product Goal

Provide a local, developer-friendly API that converts validated HTTP(S) destination URLs into server-generated short codes, redirects those codes, and exposes click-count metadata.

## Functional Requirements

### FR-01: Create a shortened URL

The service shall expose `POST /api/urls`. It shall accept a JSON body containing a `url` string and return a newly generated, URL-safe short code and the original URL.

### FR-02: Validate creation requests

The service shall accept only syntactically valid absolute `http` or `https` URLs. It shall reject missing, non-string, over-length, malformed, or non-HTTP(S) URLs with a safe client error response. Request payload size shall be limited.

### FR-03: Generate codes

The service shall generate random URL-safe short codes. The caller shall not be able to select a custom alias. Every generated code shall be unique among active in-memory records.

### FR-04: Redirect a code

The service shall expose `GET /:code`. When the code exists, it shall increment its click count once and respond with HTTP 302 and a `Location` header for the stored destination URL.

### FR-05: Handle unknown codes

For an unknown, invalid, or malformed short code, the redirect endpoint shall return a safe 404 response and shall not increment any count.

### FR-06: Retrieve metadata

The service shall expose `GET /api/urls/:code`. For an existing code, it shall return the code, original URL, creation timestamp, and current click count. For an unknown or invalid code, it shall return a safe 404 response.

### FR-07: Link lifecycle

Links shall not expire in the initial release. Data shall reside only in memory and be lost when the API process restarts; this limitation shall be documented in the README.

### FR-08: Documentation

The README shall stay current throughout the work and ultimately document prerequisites, installation, local execution, API endpoints, request and response examples, test execution, in-memory data behavior, and security-relevant constraints.

### FR-09: Quality verification

The repository shall include automated tests for successful creation, invalid URL rejection, code uniqueness, redirect behavior, click increments, metadata retrieval, unknown-code behavior, and safe error handling.

## Non-Functional Requirements

### NFR-01: Technology

Use Node.js, TypeScript, and Express. The first delivery shall contain source code, automated tests, README, and local run instructions only. Docker and cloud deployment configuration are out of scope.

### NFR-02: API behavior

Use JSON for API responses and appropriate HTTP status codes. API error responses shall be stable and generic; they shall not disclose stack traces, internal paths, implementation versions, or stored URLs beyond the requested valid resource.

### NFR-03: Security controls

All initial endpoints are explicitly public because the product is a public URL-shortening and redirect utility with no accounts or private resources. The service shall apply rate limiting to public routes, validate every route parameter and request body, reject unsafe destination schemes, configure a global error handler, fail closed on exceptional conditions, and avoid logging raw destination URLs or other sensitive request content.

### NFR-04: Dependencies

Dependencies shall use trusted official registries and be pinned by a committed lock file. The project shall document a dependency-vulnerability scan as part of its build and test guidance. Only dependencies used by the application or tests shall be included.

### NFR-05: Observability and operation

For the local-only delivery, concise structured application logging may be used for operational errors without logging raw user URLs. Centralized logging, alerts, network intermediaries, cloud IAM, TLS termination, encryption-at-rest, and deployment monitoring are out of scope because no persistent store or deployment infrastructure is included.

### NFR-06: Maintainability

Keep HTTP routes, input validation, short-code generation, and in-memory storage separated enough to test their behaviors without a running external service.

## Out of Scope

- Persistent storage or data recovery after restart.
- Custom aliases.
- Link expiration.
- Authentication, authorization, user accounts, and administrative endpoints.
- Docker, cloud deployment, infrastructure-as-code, or production monitoring.
- Property-based testing and the resiliency extension.

## Acceptance Criteria

1. A valid `POST /api/urls` request returns a success response containing a non-empty URL-safe code and the supplied URL.
2. Invalid, non-HTTP(S), oversized, or malformed URLs are rejected without creating a record.
3. `GET /:code` returns HTTP 302, targets the stored URL, and increases the record's click count by exactly one.
4. `GET /api/urls/:code` returns the matching original URL, code, creation timestamp, and current click count.
5. Unknown or malformed codes return safe 404 responses without affecting counts.
6. Repeated API creation requests do not create duplicate codes.
7. Restarting the process loses all shortened URLs, and the README states this clearly.
8. Automated tests cover the listed functional scenarios and pass locally.
9. The README contains local setup, execution, API usage, testing, limitations, and current project status.

## Security Compliance

| Rule | Status | Rationale |
|---|---|---|
| SECURITY-01 | N/A | The approved first release has no persistent store or deployment data transport. |
| SECURITY-02 | N/A | No load balancer, API gateway, or CDN is in scope. |
| SECURITY-03 | N/A | No deployed application component or centralized log service is in scope; safe local error logging is required by NFR-05. |
| SECURITY-04 | N/A | The API does not serve HTML. |
| SECURITY-05 | Compliant | FR-02, FR-05, and NFR-03 require type, size, format, and route-parameter validation. |
| SECURITY-06 | N/A | No IAM policies or cloud resources are in scope. |
| SECURITY-07 | N/A | No network infrastructure is in scope. |
| SECURITY-08 | Compliant | All endpoints are explicitly documented as public; no protected or user-owned resources exist. |
| SECURITY-09 | Compliant | NFR-02 requires safe production-style error responses and avoids default credentials or deployment defaults. |
| SECURITY-10 | Compliant | NFR-04 requires a lock file, trusted sources, minimal dependencies, and documented vulnerability scanning. |
| SECURITY-11 | Compliant | NFR-03 requires public-route rate limiting and addresses open-redirect misuse through strict HTTP(S) validation. |
| SECURITY-12 | N/A | No authentication or credentials are in scope. |
| SECURITY-13 | N/A | No external artifacts, CDN assets, CI/CD pipeline, persistent audit store, or authenticated data modifications are in scope. |
| SECURITY-14 | N/A | No deployed log service, alerting platform, or monitoring dashboard is in scope. |
| SECURITY-15 | Compliant | NFR-02 and NFR-03 require a global handler, generic errors, and fail-closed behavior. |

No blocking security findings are present in the requirements artifact.
