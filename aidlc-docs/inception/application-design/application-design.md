# URL Shortener API Application Design

## Summary

The initial service is a compact Node.js, TypeScript, Express API with six internal responsibilities: HTTP API routing, validation, link orchestration, in-memory storage, random code generation, and public-safety middleware. They may live in a compact source structure but communicate through explicit method boundaries.

## Public Contract

- `POST /api/urls`: create a server-generated short code for a validated HTTP(S) destination.
- `GET /:code`: resolve a known code, increment its count once, and return HTTP 302.
- `GET /api/urls/:code`: retrieve original URL, code, creation timestamp, and click count.

## Key Design Decisions

- All endpoints are explicitly public; there are no accounts, authentication, or resource-ownership checks in this release.
- The default rate limit is 100 requests per client IP per 15-minute window across all endpoints.
- URL and code validation are separate from routing and storage.
- The repository is deliberately in-memory; its contents disappear on restart.
- The global error handler returns generic failures and logging avoids raw destination URLs.

## Security Compliance

| Rule | Status | Design treatment |
|---|---|---|
| SECURITY-05 | Compliant | Request Validation validates body and code input; body limits are required. |
| SECURITY-08 | Compliant | Every endpoint is intentionally documented as public. |
| SECURITY-09 | Compliant | Global error handling prevents disclosure of internal details. |
| SECURITY-10 | Compliant | Lock file and vulnerability-scan guidance remain construction deliverables. |
| SECURITY-11 | Compliant | Rate-limit middleware and strict HTTP(S) validation provide layered misuse controls. |
| SECURITY-15 | Compliant | The global error handler returns a generic response and fails closed. |

SECURITY-01, SECURITY-02, SECURITY-03, SECURITY-04, SECURITY-06, SECURITY-07, SECURITY-12, SECURITY-13, and SECURITY-14 are N/A: this release has no persistence, deployed infrastructure, HTML endpoints, IAM, authentication, or centralized operational platform.

No blocking security findings are present.
