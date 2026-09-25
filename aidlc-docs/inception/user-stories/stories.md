# URL Shortener API User Stories

## Epic: Public URL Shortening

Enable public API consumers to create safe, temporary short links and enable visitors to follow those links while preserving measurable click metadata.

## US-01: Create a Short URL

**Persona**: Public API Integrator

**Story**: As a public API integrator, I want to submit a valid long URL and receive a generated short code so that I can share a compact redirect link.

**Acceptance Criteria**:

1. Given a JSON request with a valid absolute HTTP(S) `url`, when the integrator calls `POST /api/urls`, then the API returns a success response containing the original URL and a non-empty URL-safe short code.
2. Given multiple successful create requests, when the API generates codes, then no active in-memory record shares the same code.
3. Given a successful create request, when no alias field is supplied, then the server alone determines the code.
4. Given a new code is created, when its metadata is retrieved, then its click count starts at zero and includes a creation timestamp.

## US-02: Reject Unsafe or Invalid URL Creation Requests

**Persona**: Public API Integrator

**Story**: As a public API integrator, I want invalid or unsafe destination URLs to be rejected consistently so that I can correct my request without creating an unsafe redirect.

**Acceptance Criteria**:

1. Given a request without a `url`, a non-string `url`, or a payload exceeding the configured size limit, when the integrator calls `POST /api/urls`, then the API returns a safe client error and creates no record.
2. Given a malformed, relative, or non-HTTP(S) URL, when the integrator calls `POST /api/urls`, then the API returns a safe client error and creates no record.
3. Given an invalid request, when the error response is returned, then it contains no stack trace, internal path, framework version, or raw sensitive request data.

## US-03: Follow a Short URL and Count the Redirect

**Persona**: Public Redirect Visitor or Automated Client

**Story**: As a visitor following a public short link, I want the service to send me to the intended destination so that I can access the shared resource.

**Acceptance Criteria**:

1. Given an existing short code, when the visitor calls `GET /:code`, then the API returns HTTP 302 with a `Location` header set to the stored HTTP(S) destination.
2. Given an existing short code with click count `n`, when the API resolves it and sends the redirect response, then its click count becomes `n + 1` exactly once.
3. Given an unknown or malformed code, when the visitor calls `GET /:code`, then the API returns a safe 404 response and no click count changes.

## US-04: Inspect Link Metadata

**Persona**: Public API Integrator

**Story**: As a public API integrator, I want to retrieve a short link's metadata and click count so that I can confirm its destination and usage.

**Acceptance Criteria**:

1. Given an existing code, when the integrator calls `GET /api/urls/:code`, then the API returns the code, original URL, creation timestamp, and current click count as JSON.
2. Given an unknown or malformed code, when the integrator calls `GET /api/urls/:code`, then the API returns a safe 404 response.
3. Given a valid metadata request, when the response is returned, then it contains no internal implementation details beyond the documented resource metadata.

## US-05: Provide a Safe Public Service

**Personas**: Public API Integrator; Public Redirect Visitor or Automated Client

**Story**: As a public user of the service, I want predictable and abuse-resistant behavior so that the publicly hosted API remains safe and usable.

**Acceptance Criteria**:

1. Given traffic to a public endpoint, when the configured request limit is exceeded, then the API rejects excess requests with a safe rate-limit response.
2. Given an unexpected application error, when a request cannot be completed, then the global error handler returns a generic failure response and does not fail open.
3. Given operational error logging, when an error is recorded, then the entry does not include a raw destination URL or other sensitive request content.
4. Given the process restarts, when a previously created code is requested, then the service may return 404 because in-memory links are intentionally not persisted; the README documents this behavior.

## INVEST Verification

| Story | Independent | Negotiable | Valuable | Estimable | Small | Testable |
|---|---|---|---|---|---|---|
| US-01 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-02 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-03 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-04 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-05 | Yes | Yes | Yes | Yes | Yes | Yes |

## Security Compliance

| Applicable rule | Status | Story coverage |
|---|---|---|
| SECURITY-05 | Compliant | US-02 validates request bodies; US-03 and US-04 validate short-code parameters. |
| SECURITY-08 | Compliant | All stories describe expressly public endpoints with no resource-ownership model. |
| SECURITY-09 | Compliant | US-02, US-04, and US-05 require safe non-disclosing errors. |
| SECURITY-10 | Compliant | Dependency controls remain a project-level requirement carried into construction planning. |
| SECURITY-11 | Compliant | US-02 mitigates unsafe redirects and US-05 requires rate limiting. |
| SECURITY-15 | Compliant | US-05 requires a global generic-error, fail-closed path. |

All other security rules are N/A at this stage because the approved scope has no persistence, deployment infrastructure, authentication, HTML endpoints, IAM, or external delivery pipeline.
