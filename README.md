# How SnipURL Was Created with AI-DLC

SnipURL is a URL-shortener API created through the AI-Driven Development Life Cycle (AI-DLC). This README records the development process, approval gates, design decisions, and delivered artifacts rather than serving as an end-user API manual.

## Outcome

The completed scope delivers a compact Node.js, TypeScript, and Express API that:

- Creates a random seven-character short code for a valid HTTP(S) URL.
- Redirects a known short code with HTTP 302.
- Tracks one click for each resolved redirect.
- Returns link metadata and click counts.
- Applies input validation, rate limiting, request IDs, generic safe errors, and structured non-sensitive logging.

The generated application lives in `src/`, tests live in `test/`, and the AI-DLC record lives in `aidlc-docs/`.

## AI-DLC Lifecycle

### Inception

The project began as a greenfield workspace. The following stages were completed and explicitly approved:

1. **Workspace Detection**: Confirmed that there was no existing application code, build system, README, or earlier AI-DLC state.
2. **Requirements Analysis**: Defined the public API contract, in-memory lifecycle, input limits, generated codes, HTTP 302 redirects, click semantics, and initial delivery scope.
3. **User Stories**: Created two public personas and five stories for creation, validation, redirection, metadata, and safe public operation.
4. **Workflow Planning**: Selected the relevant construction stages and skipped infrastructure design because cloud deployment was not originally in scope.
5. **Application Design**: Defined a compact Express design with internal responsibilities for routing, validation, link handling, code generation, storage, rate limiting, and errors.
6. **Units Generation**: Grouped all stories into one unit of work, `url-shortener-api`, with a compact `src/` layout.

### Construction

The following stages were completed and explicitly approved for the single unit:

1. **Functional Design**: Defined the Link Record domain model, seven-character code format, five-attempt collision policy, 2,048-character destination limit, 4 KiB request limit, and click-count state transitions.
2. **NFR Requirements**: Chose Node.js 24 LTS, a 10-requests-per-second initial target, best-effort availability, and the applicable security requirements.
3. **NFR Design**: Added request correlation, rate limiting, validation boundaries, safe errors, structured logging, dependency hygiene, and documented in-memory limitations.
4. **Code Generation**: Created the API, tests, project configuration, lock file, and supporting documentation.
5. **Build and Test**: Type checking, build, 11 automated tests, and dependency audit all passed.

### Operations

The current AI-DLC Operations stage is a placeholder. No deployment, hosting, persistent storage, monitoring, or production infrastructure was implemented as part of the approved scope.

## Key Decisions

| Decision | Selected approach |
|---|---|
| Runtime | Node.js 24 LTS with TypeScript and Express |
| Storage | In memory only |
| Short code | Random, alphanumeric, seven characters |
| Collision handling | Up to five generated candidates per create request |
| Redirect | HTTP 302; increment count once when resolved |
| Input limits | URL up to 2,048 characters; JSON body up to 4 KiB |
| Public protection | 100 requests per IP per 15 minutes |
| Error handling | Generic responses with `X-Request-Id` correlation |
| Security extension | Enabled |
| Resiliency and property-based-testing extensions | Not enabled |

## Verification Results

- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm test`: passed, with 11 tests across 2 test files.
- `npm run audit`: passed with 0 vulnerabilities at the configured high-severity threshold.

Detailed results and repeatable commands are in `aidlc-docs/construction/build-and-test/`.

## AI-DLC Artifact Map

- `aidlc-docs/inception/requirements/`: approved requirements and clarifications.
- `aidlc-docs/inception/user-stories/`: personas and user stories.
- `aidlc-docs/inception/plans/`: workflow, design, unit, and story plans.
- `aidlc-docs/inception/application-design/`: components, dependencies, and unit-of-work artifacts.
- `aidlc-docs/construction/`: functional design, NFR artifacts, code-generation plan, and build/test instructions.
- `aidlc-docs/aidlc-state.md`: current lifecycle state.
- `aidlc-docs/audit.md`: timestamped raw user inputs, approvals, and workflow events.

## Hosting Considerations

The current in-memory design is suitable for local development and learning. It is not suitable for reliable serverless hosting because links, click counts, and rate-limit state can reset or diverge across instances. A production deployment should add persistent storage, a shared rate-limit store, hosted performance testing, monitoring, and a dedicated production-hardening review.
