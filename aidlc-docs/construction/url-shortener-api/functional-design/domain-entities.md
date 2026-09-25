# Domain Entities: URL Shortener API

## Link Record

Represents one active shortened link during the process lifetime.

| Attribute | Meaning | Constraints |
|---|---|---|
| `code` | Public short identifier | Exactly 7 URL-safe alphanumeric characters; unique among active records; immutable after creation. |
| `destinationUrl` | Original redirect destination | Absolute URL using only `http` or `https`; maximum 2,048 characters; immutable after creation. |
| `createdAt` | Creation instant | Assigned once when the record is created; immutable. |
| `clickCount` | Number of resolved redirects | Non-negative integer; initialized to zero; increments by one only during a successful code resolution for redirect. |

## Metadata View

The read-only representation of a Link Record returned to an API integrator contains `code`, `destinationUrl` as `url`, `createdAt`, and `clickCount`. It contains no internal state or error details.

## Domain Relationships

- One create request may create one Link Record after validation and unique-code selection.
- One Link Record may be resolved by zero or more redirect requests.
- Each resolved redirect updates the same Link Record's click count once.
- A restart discards every Link Record because the initial release has no persistent domain store.

## Invariants

1. A record cannot exist without a valid destination URL and unique code.
2. Records do not expire in this release.
3. A failed create request produces no record.
4. A failed or unknown redirect produces no click-count change.
5. Metadata lookup is read-only.
