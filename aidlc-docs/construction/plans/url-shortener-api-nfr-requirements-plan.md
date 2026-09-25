# NFR Requirements Plan: URL Shortener API

## Scope Assessment

- **Scalability**: The first release has in-memory state, so horizontal scaling and restart recovery are intentionally unavailable.
- **Performance**: Create, metadata, and redirect behavior need measurable local targets.
- **Availability**: The service is planned for public hosting but has no persistence, redundancy, or disaster-recovery scope.
- **Security**: The enabled baseline requires validation, rate limiting, generic errors, dependency controls, and fail-closed handling.
- **Reliability and maintainability**: Tests, a lock file, documented vulnerability scans, and a current README are required.
- **Usability**: The product is an API; clear JSON errors and documentation are its primary developer experience.

## Questions

## Question 1: Initial performance profile

Which target best fits the first hosted release?

A) Small public service: up to 10 requests/second total and a local p95 response time below 500 ms for create and metadata; redirects excluded from external-destination timing (recommended)

B) Moderate public service: up to 100 requests/second total and a local p95 response time below 300 ms for create and metadata

C) Learning/demo service: no formal throughput target; tests only verify correct behavior

X) Other (describe throughput and latency targets)

[Answer]: A

## Question 2: Availability expectation

What availability expectation should the first release document?

A) Best effort with no SLA, recognizing that restarts lose in-memory links and make the service temporarily unavailable (recommended)

B) Target 99.9% availability, while accepting that persistence and deployment work would need to be added later

X) Other (describe the availability target)

[Answer]: A

## Question 3: Node.js support baseline

Which runtime support policy should the repository use?

A) Use a currently supported Node.js LTS release, pin its major version in the repository, and document it in the README (recommended)

B) Support any currently supported Node.js release without pinning a major version

X) Other (describe the required Node.js version policy) 

[Answer]: A

## Execution Checklist

- [x] Analyze Functional Design, approved scope, and enabled security requirements.
- [x] Assess scalability, performance, availability, security, reliability, maintainability, and API usability.
- [x] Create this NFR Requirements plan with unresolved targets.
- [x] Validate all answers and resolve ambiguities.
- [x] Generate `nfr-requirements.md`.
- [x] Generate `tech-stack-decisions.md`.
- [x] Validate applicable security compliance and NFR traceability.
- [x] Update state tracking and README.
- [ ] Obtain explicit approval of NFR Requirements.
