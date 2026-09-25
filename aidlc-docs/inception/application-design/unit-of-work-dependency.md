# Unit of Work Dependencies

## Dependency Matrix

| Unit | Depends On | Depended On By | Communication | Notes |
|---|---|---|---|---|
| `url-shortener-api` | Node.js runtime; Express; approved runtime dependencies | None | In-process function calls and public HTTP | The only unit and deployable service. |

## Internal Dependency Direction

```text
Public HTTP request
  -> Rate-limit middleware
  -> Route handler
  -> Validation
  -> Link service
  -> Code generator and in-memory repository
  -> HTTP response or global safe error handler
```

## Coordination Implications

- No inter-unit API, version, deployment, or data-migration coordination is required.
- Construction proceeds sequentially within this one unit: functional design, NFR requirements, NFR design, code generation, then build and test.
- The public HTTP contract is the unit's external integration boundary and must remain consistent with the approved requirements.
