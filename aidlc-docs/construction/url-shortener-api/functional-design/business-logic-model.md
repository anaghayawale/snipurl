# Business Logic Model: URL Shortener API

## Create Link Workflow

1. Receive a public create request.
2. Enforce the rate limit and 4 KiB body limit.
3. Validate the JSON shape and destination URL.
4. For attempts 1 through 5, generate a 7-character candidate and check whether it exists.
5. If a unique candidate is found, create the in-memory Link Record with zero clicks and return its metadata.
6. If validation fails, return a safe client error with no state change.
7. If all candidates collide, return a generic safe failure with no state change.

## Resolve Redirect Workflow

1. Receive a public redirect request.
2. Enforce the rate limit.
3. Validate the code format.
4. Locate the active Link Record.
5. If absent, return a safe not-found result with no state change.
6. If present, increment `clickCount` by one and issue HTTP 302 to `destinationUrl`.
7. If an unexpected error occurs before the redirect is issued, return a generic failure and do not issue a redirect.

## Retrieve Metadata Workflow

1. Receive a public metadata request.
2. Enforce the rate limit.
3. Validate the code format.
4. Locate the active Link Record.
5. If present, convert it to the Metadata View and return it without changing state.
6. If absent, return a safe not-found result.

## State Transitions

| Event | Precondition | State change | Outcome |
|---|---|---|---|
| Create succeeds | Valid URL and unique code within five attempts | Add record with `clickCount = 0` | Creation metadata |
| Create fails validation | Invalid body or URL | None | Safe client error |
| Create exhausts collisions | Five generated candidates exist | None | Generic safe failure |
| Redirect resolves | Valid known code | Increment click count by one | HTTP 302 |
| Redirect misses | Invalid or unknown code | None | Safe 404 |
| Metadata resolves | Valid known code | None | Metadata view |
| Process restarts | Any in-memory records | Remove all records | Later lookups may return 404 |

## Story Traceability

| Story | Functional model coverage |
|---|---|
| US-01 | Create Link Workflow; Link Record invariants. |
| US-02 | Create validation and Public Safety rules. |
| US-03 | Resolve Redirect Workflow and click-count transition. |
| US-04 | Retrieve Metadata Workflow. |
| US-05 | Rate limit, generic failure, safe logging, and restart lifecycle rules. |
