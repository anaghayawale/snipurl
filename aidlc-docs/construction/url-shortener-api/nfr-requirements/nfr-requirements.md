# NFR Requirements: URL Shortener API

## Performance

- Support up to 10 requests per second total for the initial hosted release.
- For create and metadata operations, target local p95 processing time below 500 ms under the stated load.
- Redirect timing ends when the API issues HTTP 302; external destination response time is not measured or controlled by this service.
- Enforce a 4 KiB JSON-body limit to bound request processing work.

## Scalability and Availability

- The first release is a single in-memory process and does not support horizontal scaling, shared state, or recovery after restart.
- Availability is best effort with no SLA. Planned restarts and failures can temporarily make the API unavailable and permanently lose links.
- Persistent storage, multiple replicas, failover, and disaster recovery are explicitly deferred.

## Security

- Treat all three endpoints as intentionally public; no authentication, authorization, or ownership model applies.
- Validate every request body and short-code parameter before business processing.
- Accept only absolute HTTP(S) URLs up to 2,048 characters and enforce the 4 KiB JSON-body limit.
- Rate limit all public endpoints to 100 requests per client IP in a rolling 15-minute window.
- Return generic errors; do not expose stack traces, internal paths, framework versions, or raw destination URLs in errors or operational logs.
- Use a global error boundary that fails closed: it does not create a partial link or redirect after an unexpected failure.
- Use a committed dependency lock file, trusted registries, minimal dependencies, and a documented dependency-vulnerability scan.

## Reliability and Maintainability

- Use automated HTTP-level tests for success, validation, collision, redirect, click count, metadata, not-found, rate-limit, and generic-error paths.
- Keep routing, validation, state, code generation, and middleware in focused source files within the selected compact layout.
- Keep README setup, API, testing, limitation, and security notes current.

## API Usability

- Use documented JSON request and response bodies for non-redirect API endpoints.
- Use stable safe client errors for invalid input, unknown codes, and rate-limit responses.
- Document the in-memory lifecycle and lack of an availability SLA.

## Security Compliance

| Rule | Status | NFR treatment |
|---|---|---|
| SECURITY-05 | Compliant | Explicit validation, code format, URL and body bounds are required. |
| SECURITY-08 | Compliant | All endpoints are deliberately public and documented as such. |
| SECURITY-09 | Compliant | Generic error responses and no raw URL logging are required. |
| SECURITY-10 | Compliant | Lock file, trusted registry, minimal dependencies, and vulnerability scanning are required. |
| SECURITY-11 | Compliant | Rate limiting and unsafe-redirect prevention are required. |
| SECURITY-15 | Compliant | A global, generic-error, fail-closed path is required. |

SECURITY-01, SECURITY-02, SECURITY-03, SECURITY-04, SECURITY-06, SECURITY-07, SECURITY-12, SECURITY-13, and SECURITY-14 are N/A because this scoped release has no persistence, deployed infrastructure, HTML endpoints, IAM, authentication, CI/CD pipeline, or centralized monitoring platform.

No blocking security findings are present.
