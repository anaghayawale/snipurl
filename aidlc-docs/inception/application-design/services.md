# Service Design

## Link Service

The Link Service is the sole application-level orchestrator. It keeps public HTTP concerns out of the repository and code generator.

### Create Flow

1. The HTTP API passes a validated destination URL to the Link Service.
2. The service requests a candidate from the Short-Code Generator.
3. The service checks the repository for collisions and retries according to Functional Design rules.
4. The service creates a link record with the current time and zero clicks, stores it, and returns metadata.

### Redirect Flow

1. The HTTP API passes a validated code to the Link Service.
2. The service asks the repository to increment and return the matching record.
3. If no record exists, the HTTP API returns its safe 404 response.
4. If a record exists, the HTTP API sends HTTP 302 to its stored destination.

### Metadata Flow

1. The HTTP API passes a validated code to the Link Service.
2. The service retrieves the record without changing its count.
3. The service maps the internal record to the documented metadata response.

## Error and Rate-Limit Orchestration

Public Safety Middleware runs before route handlers. Validation errors and not-found results are handled as known, safe client responses. Unexpected errors reach the global error handler, which fails closed with a generic response and avoids recording raw destination URLs.
