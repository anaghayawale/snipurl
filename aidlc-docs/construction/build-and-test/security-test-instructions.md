# Security Test Instructions

## Dependency Scan

```sh
npm run audit
```

Expected: no high-severity or higher vulnerabilities. Current result: 0 vulnerabilities.

## Static Checks

```sh
npm run typecheck
npm test
```

Verify tests cover invalid and non-HTTP(S) URLs, seven-character code validation, rate limiting, request IDs, safe not-found errors, and generic internal errors.

## Manual Checks

- Confirm `POST /api/urls` rejects non-HTTP(S), malformed, oversized, or extra-field requests.
- Confirm error responses contain no stack trace, raw destination URL, or internal filesystem path.
- Confirm all public responses include `X-Request-Id`.
- Confirm the 101st request from one local client within 15 minutes receives HTTP 429.
- Confirm `package-lock.json` is committed and only approved dependencies remain in `package.json`.

## Scope Limitations

Authentication, authorization, persistent-store encryption, cloud IAM, external logging, network security groups, and deployment monitoring are out of scope for this initial release and must be added before a production hardening review.
