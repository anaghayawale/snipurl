# URL Shortener API - Requirements Verification Questions

The requested capabilities are clear, but the following decisions are required to establish a complete, testable API contract. Select one answer for each question by replacing the text after `[Answer]:`. For `X`, provide the detail after the selected letter.

## Question 1: Runtime and framework

Which implementation stack should the initial API use?

A) Node.js with TypeScript and Express

B) Python with FastAPI

C) Java with Spring Boot

X) Other (describe the preferred runtime and framework)

[Answer]: from A and B which one is easy to configure. I'm aware of A but not B

## Question 2: Data storage

What persistence approach should the first version use?

A) SQLite database stored locally (recommended for a self-contained repository)

B) PostgreSQL database

C) In-memory store only (data is lost when the API restarts)

X) Other (describe the preferred storage)

[Answer]: C

## Question 3: Public API contract

Which initial endpoint shape should the service provide?

A) `POST /api/urls` to create, `GET /:code` to redirect, and `GET /api/urls/:code` to retrieve metadata and click count

B) `POST /shorten` to create, `GET /:code` to redirect, and `GET /stats/:code` to retrieve click count

X) Other (describe the required endpoint paths and response format)

[Answer]: A

## Question 4: Short-code creation and custom aliases

How should codes be assigned?

A) Server-generated random, URL-safe codes only

B) Server-generated codes with an optional caller-provided custom alias

X) Other (describe the required code or alias policy)

[Answer]: A

## Question 5: Expiration and invalid destinations

What initial lifecycle policy should apply?

A) Links never expire; reject malformed or non-HTTP(S) destination URLs

B) Support an optional expiration timestamp; reject malformed or non-HTTP(S) destination URLs

C) Links never expire; accept any syntactically valid URL scheme

X) Other (describe the required expiry and URL-validation policy)

[Answer]: A

## Question 6: Redirect and click-count semantics

What should count as a click, and what redirect status should be returned?

A) Increment once for every successful redirect; use HTTP 302

B) Increment once for every successful redirect; use HTTP 307

C) Increment before attempting every redirect request, including destinations that later fail; use HTTP 302

X) Other (describe the counting and redirect policy)

[Answer]: I'm not sure on this what is recommended

## Question 7: Delivery target

What should be included in this repository's first delivery?

A) API source, automated tests, README, and local run instructions only

B) API source, automated tests, README, local run instructions, and a Docker configuration

C) API source, automated tests, README, local run instructions, Docker configuration, and cloud deployment configuration

X) Other (describe the required delivery target)

[Answer]: A

## Question 8: Resiliency extension

Should the resiliency baseline be applied to this project?

A) Yes - apply directional design-time resiliency practices for fault tolerance, observability, availability, and recoverability

B) No - skip the resiliency baseline

X) Other (describe the preferred resiliency posture)

[Answer]: what is resiliency baseline

## Question 9: Security extension

Should security extension rules be enforced for this project?

A) Yes - enforce all security rules as blocking constraints

B) No - skip the security rules

X) Other (describe the required security posture)

[Answer]: what security rules we are talking about here?

## Question 10: Property-based testing extension

Should property-based testing rules be enforced for this project?

A) Yes - enforce property-based testing rules for relevant logic

B) Partial - enforce the rules only for pure functions and serialization round-trips

C) No - skip property-based testing rules

X) Other (describe the required testing approach)

[Answer]: C
