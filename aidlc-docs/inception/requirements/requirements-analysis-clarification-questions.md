# URL Shortener API - Requirements Clarifications

Your prior answers establish the initial API shape, in-memory persistence, generated codes, HTTP(S)-only destinations, no expiration, a source-and-tests delivery, and no property-based testing extension. The following selections resolve the remaining ambiguities. Select one answer for each question by replacing the text after `[Answer]:`.

## Clarification 1: Framework choice

You are familiar with Node.js and TypeScript, while Python/FastAPI would be new to you. Which should this repository use?

A) Node.js, TypeScript, and Express (recommended: lowest setup and learning overhead for this project)

B) Python and FastAPI (recommended only if you prefer to learn the Python stack)

X) Other (describe the preferred stack)

[Answer]: A

## Clarification 2: Redirect and click-count policy

For a URL shortener, the usual initial policy is HTTP 302 and incrementing the click count when the service successfully resolves the short code and issues that redirect. This avoids asserting that the destination itself loaded, which the service cannot observe.

A) Use HTTP 302 and increment the count when the API resolves a valid short code and sends the redirect response (recommended)

B) Use HTTP 307 and increment the count when the API resolves a valid short code and sends the redirect response

C) Use HTTP 302 and increment the count before sending a redirect response

X) Other (describe the redirect and count behavior)

[Answer]: A

## Clarification 3: Resiliency baseline

The resiliency baseline is optional design guidance based on reliability practices. For this small in-memory API, enabling it would add design attention to graceful errors, basic health and observability, and recovery limitations; it does not guarantee production availability.

A) Enable it as design guidance

B) Do not enable it for the initial local API (recommended)

X) Other (describe the required resiliency posture)

[Answer]: B

## Clarification 4: Security baseline

The security baseline is optional blocking guidance for secure application design. If enabled, it will require safeguards relevant to this API, such as strict HTTP(S) URL validation, safe error handling, dependency hygiene, and avoiding unsafe redirect behavior. It does not add authentication unless requirements call for it.

A) Enable the security baseline (recommended, because this API redirects user-supplied URLs)

B) Do not enable it for the initial local API

X) Other (describe the required security posture)

[Answer]: A
