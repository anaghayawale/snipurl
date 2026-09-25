# Unit of Work Story Map

| Story | Unit | Rationale |
|---|---|---|
| US-01: Create a Short URL | `url-shortener-api` | Uses the public creation endpoint, validation, generator, service, and in-memory repository. |
| US-02: Reject Unsafe or Invalid URL Creation Requests | `url-shortener-api` | Uses validation and safe HTTP error behavior inside the same service. |
| US-03: Follow a Short URL and Count the Redirect | `url-shortener-api` | Uses the public redirect endpoint and in-memory click accounting. |
| US-04: Inspect Link Metadata | `url-shortener-api` | Uses the public metadata endpoint and in-memory record lookup. |
| US-05: Provide a Safe Public Service | `url-shortener-api` | Applies rate limiting, safe errors, logging constraints, and in-memory lifecycle behavior across the service. |

## Coverage Check

- **Stories assigned**: 5 of 5.
- **Unassigned stories**: None.
- **Cross-unit stories**: None.
- **Security coverage**: US-02 and US-05 carry the validation, safe-error, rate-limit, and fail-closed requirements into construction.
