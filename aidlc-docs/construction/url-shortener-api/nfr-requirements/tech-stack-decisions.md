# Technology Stack Decisions: URL Shortener API

## Runtime and Language

- **Node.js 24 LTS**: Pin the major version with `engines` as `>=24 <25`. Node.js lists v24 as an LTS release and its latest LTS branch on the official releases page.
- **TypeScript**: Provide static checking for records, service boundaries, and handler contracts.

## HTTP and Validation

- **Express**: Compact public HTTP routing and middleware model.
- **Zod**: Schema-based request and parameter validation with explicit size and format constraints.
- **express-rate-limit**: In-memory, process-local enforcement of the approved 100-per-15-minute policy.

## Testing

- **Vitest**: TypeScript-friendly unit and HTTP test runner.
- **Supertest**: Exercise Express endpoints without binding an external port.

## Logging and Errors

- **Pino**: Structured, non-sensitive operational logging in the application process.
- Use an Express global error handler for generic error responses and fail-closed behavior.

## Dependency and Build Policy

- Use packages from the official npm registry only.
- Commit `package-lock.json`; use the lock file for reproducible installations.
- Keep dependencies limited to the listed runtime and test needs.
- Document `npm audit` as the initial dependency-vulnerability scan.
- Use `tsc` for type checking and compile output to a local `dist/` directory.

## Deliberately Excluded

- Database, cache, queue, message broker, or external URL-validation service.
- Docker, cloud SDK, infrastructure-as-code, centralized log service, and monitoring platform.
- Authentication, authorization, user management, and frontend framework.
