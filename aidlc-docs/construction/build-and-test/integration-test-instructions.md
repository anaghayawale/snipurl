# Integration Test Instructions

## Scope

There is one service and no external database or second unit. Integration verification therefore exercises the assembled Express API end to end in one local process.

## Start the API

```sh
npm run dev
```

## Scenario: Create, Redirect, and Inspect

1. Create a link:

```sh
curl -i -X POST http://localhost:3000/api/urls -H "Content-Type: application/json" -d '{"url":"https://example.com/docs"}'
```

2. Copy the returned seven-character code.
3. Request `GET /<code>` with redirects disabled and verify HTTP 302 plus the `Location` header.
4. Request `GET /api/urls/<code>` and verify the click count is 1.

## Scenario: Safe Rejection

```sh
curl -i -X POST http://localhost:3000/api/urls -H "Content-Type: application/json" -d '{"url":"ftp://example.com"}'
```

Expected: safe HTTP 400 response with no created record.

## Cleanup

Stop the local process. Because storage is in memory, process restart automatically removes created links and resets rate-limit state.
