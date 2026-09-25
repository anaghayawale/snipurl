# SnipURL

An AI-DLC-managed URL shortener API project.

## Status

Inception is complete and approved. Construction has not started and will begin only after explicit instruction.

## Requested capabilities

- Accept a long URL and return a short code.
- Redirect a short code to its original URL.
- Track the number of redirects for each short code.

## Approved Requirements Direction (Pending Stage Approval)

- Node.js, TypeScript, and Express.
- In-memory storage only; links are lost when the process restarts.
- `POST /api/urls` creates a random URL-safe code.
- `GET /:code` redirects with HTTP 302 and increments the click count.
- `GET /api/urls/:code` returns URL metadata and click count.
- Only valid HTTP(S) destinations are accepted; custom aliases and expiration are excluded.
- Automated tests and local run instructions are included; Docker and cloud deployment are excluded.
- Security baseline is enabled; resiliency and property-based-testing extensions are not enabled.

## Documentation

AI-DLC project records are maintained in `aidlc-docs/`.

The active requirements clarification questionnaire is `aidlc-docs/inception/requirements/requirements-analysis-clarification-questions.md`.

The requirements record is `aidlc-docs/inception/requirements/requirements.md`.

The active story-planning document is `aidlc-docs/inception/plans/story-generation-plan.md`.

The active story-planning clarification is `aidlc-docs/inception/plans/story-generation-plan-clarification-questions.md`.

The generated story artifacts are `aidlc-docs/inception/user-stories/stories.md` and `aidlc-docs/inception/user-stories/personas.md`.

The execution plan is `aidlc-docs/inception/plans/execution-plan.md`.

The active application-design plan is `aidlc-docs/inception/plans/application-design-plan.md`.

Application-design artifacts are in `aidlc-docs/inception/application-design/`.

The active unit-of-work plan is `aidlc-docs/inception/plans/unit-of-work-plan.md`.

The generated unit artifacts are in `aidlc-docs/inception/application-design/`.

The next approved stage is Functional Design for the `url-shortener-api` unit.
