# Build Instructions

## Prerequisites

- Node.js 24 LTS
- npm
- Network access to the official npm registry for the first `npm ci`

No environment variable is required. `PORT` is optional and defaults to `3000`.

## Build Steps

### 1. Install locked dependencies

```sh
npm ci
```

### 2. Type check

```sh
npm run typecheck
```

### 3. Build

```sh
npm run build
```

## Expected Results

- Type checking exits with code 0.
- Build creates JavaScript output under `dist/`.
- Start the compiled API with `npm start`.

## Troubleshooting

- If `npm ci` fails, confirm Node.js 24 is active and that `package-lock.json` is present and unmodified.
- If TypeScript reports missing packages, remove no files manually; run `npm ci` again to restore the lock-file state.
- If port 3000 is occupied, set another valid port before starting the API, for example `PORT=3001 npm start` in a compatible shell.
