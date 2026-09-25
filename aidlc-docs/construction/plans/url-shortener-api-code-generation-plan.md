# Code Generation Plan: URL Shortener API

## Unit Context

- **Unit**: `url-shortener-api`
- **Stories**: US-01 through US-05.
- **Dependencies on other units**: None.
- **Owned data**: In-memory Link Record: code, destination URL, creation time, click count.
- **Public interface**: `POST /api/urls`, `GET /:code`, `GET /api/urls/:code`.
- **Code location**: Workspace root, using `src/` and `test/`. Documentation summaries go only under `aidlc-docs/construction/url-shortener-api/code/`.

## Target Structure

```text
package.json
package-lock.json
tsconfig.json
.gitignore
src/
  app.ts
  server.ts
  validation.ts
  links.ts
  codes.ts
  middleware.ts
test/
  links.test.ts
  app.test.ts
README.md
```

## Planning Checklist

- [x] Read Functional Design, NFR Requirements, NFR Design, story map, and state tracking.
- [x] Confirm the unit has no inter-unit dependency and owns no persistent database entity.
- [x] Confirm application code belongs at the workspace root.
- [x] Confirm Infrastructure Design is skipped: no cloud, container, database, gateway, or deployment artifact is in scope.
- [x] Define exact generated paths and story traceability.
- [x] Create this executable plan as the source of truth for code generation.
- [x] Record the code-generation plan approval request in the audit trail.
- [x] Obtain explicit approval of this complete plan.

## Generation Steps

### Step 1: Set up the TypeScript project

- [x] Create `package.json`, `tsconfig.json`, and `.gitignore`.
- [x] Configure Node.js 24 LTS major support, TypeScript compilation, Vitest tests, and audit/type-check scripts.
- [x] Install only the approved runtime and test dependencies from the official npm registry and commit `package-lock.json`.

**Stories**: Foundation for US-01 through US-05.

### Step 2: Generate core link logic

- [x] Create `src/codes.ts` with random 7-character alphanumeric code generation.
- [x] Create `src/validation.ts` with URL and code schemas enforcing HTTP(S), 2,048-character URL, and 7-character code limits.
- [x] Create `src/links.ts` with in-memory records, five-attempt collision handling, metadata mapping, and click increments.

**Stories**: US-01, US-02, US-03, US-04.

### Step 3: Test core link logic

- [x] Create `test/links.test.ts` for unique creation, collision exhaustion, metadata read behavior, and click-count increments.

**Stories**: US-01, US-03, US-04.

### Step 4: Generate HTTP and NFR middleware

- [x] Create `src/middleware.ts` with request-ID, rate-limit, structured safe logging, and global error middleware.
- [x] Create `src/app.ts` with a 4 KiB JSON body limit and the three public routes.
- [x] Create `src/server.ts` to start the local process.

**Stories**: US-01 through US-05.

### Step 5: Test the public API

- [x] Create `test/app.test.ts` covering successful creation, invalid URLs, redirect HTTP 302 and location, click count, metadata, unknown codes, rate limiting, request IDs, and generic errors.

**Stories**: US-01 through US-05.

### Step 6: Update repository documentation

- [x] Update `README.md` with prerequisites, installation, run and test commands, endpoint examples, responses, limits, security behaviors, in-memory lifecycle, best-effort availability, and current AI-DLC status.
- [x] Create `aidlc-docs/construction/url-shortener-api/code/code-generation-summary.md` documenting the generated source, tests, and deliberate exclusions.

**Stories**: US-05 and FR-08.

### Step 7: Verify security and generated artifacts

- [x] Run type checking and the automated tests.
- [x] Run the documented dependency vulnerability scan.
- [x] Verify the lock file, absence of secrets, safe errors, input limits, rate limiting, and request-ID behavior.
- [x] Update this plan's checkboxes, state tracking, README, and audit trail with results.

## Story Implementation Status

- [x] US-01: Create a Short URL
- [x] US-02: Reject Unsafe or Invalid URL Creation Requests
- [x] US-03: Follow a Short URL and Count the Redirect
- [x] US-04: Inspect Link Metadata
- [x] US-05: Provide a Safe Public Service

**Stories**: US-02, US-05; SECURITY-05, SECURITY-08, SECURITY-09, SECURITY-10, SECURITY-11, SECURITY-15.

## Expected Scope

Seven sequential generation steps will create a compact API service, HTTP and logic tests, project configuration, current README, and a code-generation summary. Docker, deployment, cloud, database, and frontend artifacts are intentionally not generated.
