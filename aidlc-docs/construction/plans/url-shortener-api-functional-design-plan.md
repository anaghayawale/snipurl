# Functional Design Plan: URL Shortener API

## Scope

Define the technology-agnostic domain model, workflows, validation rules, and error behavior for the single URL-shortener API unit. Deployment and infrastructure design remain out of scope.

## Context Assessment

- **Business logic and domain model**: A link record has a short code, HTTP(S) destination, creation time, and click count.
- **Data flow**: A create request becomes a validated record; a redirect lookup increments an existing record; metadata lookup is read-only.
- **Integrations**: None. The service has no external API, database, queue, or frontend.
- **Errors**: Validation, not-found, rate-limit, collision-exhaustion, and unexpected failure cases need explicit safe outcomes.
- **Business scenarios**: Create, invalid create, redirect, unknown redirect, metadata, and restart lifecycle are all covered by the approved stories.

## Questions

## Question 1: Short-code length

What fixed length should generated URL-safe short codes use in the first release?

A) 7 characters (recommended: compact while offering a large code space)

B) 8 characters (larger code space with one additional character)

C) 6 characters (shortest option, with a smaller code space)

X) Other (describe the preferred length or format)

[Answer]: A

## Question 2: Collision retry policy

How should the business logic behave if a generated code already exists?

A) Retry up to 5 distinct generated candidates, then return a generic safe failure without creating a link (recommended)

B) Continue generating until a unique candidate is found

C) Retry once, then return a generic safe failure without creating a link

X) Other (describe the preferred policy)

[Answer]: A

## Execution Checklist

- [x] Analyze the approved unit definition, stories, requirements, and security constraints.
- [x] Identify domain concepts, business workflows, validation, errors, and no-integration boundary.
- [x] Create this functional-design plan with unresolved business-rule questions.
- [x] Validate all answers and resolve ambiguities.
- [x] Generate `business-logic-model.md`.
- [x] Generate `business-rules.md`.
- [x] Generate `domain-entities.md`.
- [x] Validate completeness, story traceability, and applicable security constraints.
- [x] Update state tracking and README.
- [ ] Obtain explicit approval of Functional Design.
