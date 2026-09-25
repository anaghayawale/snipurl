# NFR Design Patterns: URL Shortener API

## Input Boundary Pattern

Apply JSON body-size enforcement before route processing. Apply schema validation to the create body and code parameters before calling the Link Service. Reject invalid input with safe client responses and no state change.

## Rate-Limit Pattern

Apply one process-local limiter before all public routes. It uses the client IP as key and enforces 100 requests in a rolling 15-minute window. Rejected requests receive a safe 429 response and do not reach validation or business operations. The limiter state intentionally resets with the process.

## Request-Correlation Pattern

At the beginning of each request, accept an incoming request ID only if it matches the implementation's safe identifier format; otherwise generate one. Attach it to request context, include it in structured log fields, and return it in `X-Request-Id`. Do not derive it from a destination URL or include destination URLs in logs.

## Safe Error Boundary Pattern

Use a final global error handler after all routes. It logs the error category, request ID, timestamp, and log level without raw destination URLs, then returns a generic JSON 500 response. It does not redirect, create a link, or expose error internals after an unexpected error.

## Performance-Bounding Pattern

Use bounded payloads, synchronous in-memory lookup, and bounded code-generation attempts. There are no synchronous external calls in create, metadata, or redirect processing. Redirect performance ends when HTTP 302 is issued.

## Dependency Hygiene Pattern

Pin dependency resolution through a committed lock file, source packages only from the official npm registry, keep runtime dependencies minimal, and run `npm audit` in the documented verification flow.

## Availability Limitation Pattern

Run as a single best-effort process. Do not claim persistence, failover, or an SLA. Document that restart clears links and limiter counters.

## Security Compliance

| Rule | Status | Pattern |
|---|---|---|
| SECURITY-05 | Compliant | Input Boundary Pattern provides validation and size bounds. |
| SECURITY-08 | Compliant | Public-route policy is explicit and universal. |
| SECURITY-09 | Compliant | Safe Error Boundary Pattern hides implementation details. |
| SECURITY-10 | Compliant | Dependency Hygiene Pattern requires lock file and audit. |
| SECURITY-11 | Compliant | Rate-Limit and Input Boundary patterns layer abuse defenses. |
| SECURITY-15 | Compliant | Global error boundary returns generic fail-closed results. |

All other security rules remain N/A for the approved local-only, no-persistence, no-infrastructure scope. No blocking security findings are present.
