# Performance Test Instructions

## Target

- Up to 10 requests per second total.
- Local p95 below 500 ms for create and metadata operations.
- Redirect measurement ends when the API issues HTTP 302; it does not measure destination loading.

## Setup

1. Start the API with `npm run dev`.
2. Create one valid link and retain its code for metadata requests.

## Suggested Local Load Test

Use a temporary command-line tool without adding it as a project dependency:

```sh
npx autocannon -c 10 -d 30 http://localhost:3000/api/urls/<code>
```

Run a separate create-request test using an `autocannon` request-body configuration or a dedicated load-testing tool. Record throughput, p95 latency, and error rate.

## Pass Criteria

- Aggregate request rate meets the 10 requests-per-second target.
- Local p95 is below 500 ms for create and metadata requests.
- No unexpected HTTP 5xx responses occur under the target load.

## Current Status

Not executed in this local code-generation run. Run it against a representative host before presenting the API as production-ready.
