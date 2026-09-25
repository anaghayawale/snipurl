# Business Rules: URL Shortener API

## Create Rules

1. The create operation accepts only a JSON object with one required `url` value.
2. The complete JSON request body must not exceed 4 KiB.
3. The `url` value must be a string of 1 to 2,048 characters.
4. The `url` value must parse as an absolute URL with `http` or `https` protocol. Relative URLs and all other schemes are rejected.
5. A valid create request produces one record with click count zero and the creation time set at creation.
6. The service generates a 7-character random alphanumeric candidate code. The client cannot supply an alias.
7. The service attempts at most five generated candidates per create operation. A candidate already held by an active record is discarded. If all five candidates collide, no record is created and the operation returns a generic safe failure.

## Redirect Rules

1. A redirect request accepts a short-code path value only when it is exactly seven alphanumeric characters.
2. A valid known code resolves its active record, increments its click count by exactly one, and returns an HTTP 302 redirect to its stored destination URL.
3. An invalid-format or unknown code returns a safe not-found result and does not change any count.
4. The service counts a click when it has resolved the code and issued its redirect response. It does not attempt to determine whether the external destination loaded.

## Metadata Rules

1. A metadata request accepts a code only when it is exactly seven alphanumeric characters.
2. A valid known code returns the record's code, destination URL, creation time, and current click count.
3. An invalid-format or unknown code returns a safe not-found result.
4. Metadata lookup does not change the click count.

## Public Safety and Error Rules

1. Every public request is subject to the approved limit of 100 requests per client IP in a rolling 15-minute window.
2. A request exceeding that limit returns a safe rate-limit result and does not execute a create, redirect, or metadata operation.
3. Validation errors return safe client errors without internal details or raw destination URLs.
4. Unexpected errors return a generic failure result, do not create partial records, and do not issue a redirect.
5. Operational error logging excludes raw destination URLs and other sensitive request content.
6. All endpoints are intentionally public in this release; no authentication or ownership checks apply.

## Lifecycle Rule

All records are in memory only. Process restart removes every record. The public documentation must state this limitation.
