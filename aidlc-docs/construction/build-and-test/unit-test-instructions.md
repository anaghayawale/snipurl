# Unit Test Instructions

## Run the suite

```sh
npm test
```

## Expected Results

- 11 tests pass across 2 test files.
- `test/links.test.ts` verifies unique creation, collision retry and exhaustion, metadata reads, and click increments.
- `test/app.test.ts` verifies the public HTTP contract, validation, redirect, metadata, not-found behavior, request IDs, rate limiting, and generic errors.

## Current Result

The generated suite passed: 11 passed, 0 failed.

## If a Test Fails

1. Read the failing assertion in the Vitest output.
2. Check the relevant business rule and NFR design artifact.
3. Correct the implementation or test only after the change is approved through the applicable AI-DLC stage.
4. Re-run `npm test` and `npm run typecheck`.
