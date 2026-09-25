# SnipURL

A compact, in-memory URL shortener API built with Node.js, TypeScript, and Express.

## Status

Build and Test instructions are complete and awaiting approval. Type checking, build, 11 automated tests, and dependency audit have passed; representative-host performance testing remains pending.

## Requirements

- Node.js 24 LTS
- npm

## Install and run

```sh
npm ci
npm run dev
```

The API listens on `http://localhost:3000` by default. Set `PORT` to use a different port.

For a compiled run:

```sh
npm run build
npm start
```

## API

### Create a short URL

`POST /api/urls`

```json
{
  "url": "https://example.com/a-long-path"
}
```

Success response (`201`):

```json
{
  "code": "Ab3xYz9",
  "url": "https://example.com/a-long-path",
  "createdAt": "2026-09-25T00:00:00.000Z",
  "clickCount": 0
}
```

### Redirect

`GET /:code` returns HTTP `302` with `Location` set to the original URL. A successful resolved redirect increments `clickCount` once.

### Get metadata

`GET /api/urls/:code` returns the code, original URL, creation time, and current click count.

## Limits and safety behavior

- Only absolute `http` and `https` destinations are accepted.
- Destination URLs are limited to 2,048 characters; JSON request bodies are limited to 4 KiB.
- Codes are server-generated, alphanumeric, and seven characters long. Custom aliases and expiration are not supported.
- Public endpoints are rate limited to 100 requests per IP address per 15 minutes.
- Responses include `X-Request-Id`; valid caller-provided IDs are accepted, otherwise one is generated.
- Errors are generic and do not reveal stack traces or raw destination URLs.
- Links and rate-limit state are in memory only. Restarting the process permanently removes all links and resets limits.
- This is a best-effort service with no availability SLA, persistence, failover, or horizontal scaling.

## Test and verification

```sh
npm test
npm run typecheck
npm run audit
```

## Project scope

The initial release intentionally excludes authentication, user accounts, persistent storage, Docker, cloud deployment, and frontend UI.

## AI-DLC documentation

AI-DLC records are maintained in `aidlc-docs/`. The approved requirements, designs, plans, and code-generation summary provide the project audit trail.
