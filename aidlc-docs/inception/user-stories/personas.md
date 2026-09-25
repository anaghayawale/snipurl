# URL Shortener API Personas

## Persona 1: Public API Integrator

**Description**: A developer or automation author who uses the public API to create a short URL and inspect its metadata.

**Goals**:

- Create a shareable short link from a valid HTTP(S) destination.
- Receive a predictable response with a unique short code.
- Inspect click-count metadata for a known code.
- Receive safe, actionable HTTP errors for invalid input or unknown codes.

**Needs**:

- Stable public endpoint paths and JSON responses.
- Clear validation rules and documented local setup.
- No account or authentication requirement in the initial release.

**Related stories**: US-01, US-02, US-04, US-05.

## Persona 2: Public Redirect Visitor or Automated Client

**Description**: Any person, browser, or automated client that follows a public short link created by an integrator.

**Goals**:

- Reach the intended HTTP(S) destination quickly and safely.
- Receive a predictable not-found result when a code is invalid or unknown.

**Needs**:

- A standard temporary redirect response.
- Protection from malformed codes and unsafe server behavior.

**Related stories**: US-03, US-05.

## Persona Mapping Summary

| Persona | Primary interaction | Stories |
|---|---|---|
| Public API Integrator | Create and inspect shortened URLs | US-01, US-02, US-04, US-05 |
| Public Redirect Visitor or Automated Client | Follow a shortened URL | US-03, US-05 |
