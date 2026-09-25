# NFR Design Plan: URL Shortener API

## Pattern Assessment

- **Resilience**: No external calls exist, so no retry, circuit-breaker, queue, or recovery component is needed. Global error handling fails closed.
- **Scalability**: One process with process-local state and rate limiting is intentional; horizontal scaling is deferred.
- **Performance**: Bound request body size, synchronous in-memory operations, and no external dependency support the 10 requests/second target.
- **Security**: Validation, global rate limiting, generic errors, structured non-sensitive logs, pinned dependencies, and a global handler compose layered controls.
- **Logical components**: Request-ID, rate-limit, validation, logging, and error-boundary behaviors are logical middleware concerns within the compact API unit; no new infrastructure component is introduced.

## Question

## Question 1: Request ID exposure

How should the NFR design handle a request identifier?

A) Generate or accept a safe request ID, include it in structured logs, and return it as `X-Request-Id` so callers can report an error without exposing sensitive details (recommended)

B) Generate a request ID for structured logs only; do not expose it in response headers

X) Other (describe the desired request-ID policy)

[Answer]: A

## Execution Checklist

- [x] Analyze NFR requirements, technology decisions, and enabled security constraints.
- [x] Assess resilience, scalability, performance, security, and logical-component patterns.
- [x] Create this NFR Design plan with the remaining request-ID decision.
- [x] Validate the answer and resolve ambiguity.
- [x] Generate `nfr-design-patterns.md`.
- [x] Generate `logical-components.md`.
- [x] Validate applicable security compliance and traceability.
- [x] Update state tracking and README.
- [ ] Obtain explicit approval of NFR Design.
