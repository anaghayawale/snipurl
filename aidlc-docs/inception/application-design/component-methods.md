# Component Methods

These signatures describe component boundaries only. Detailed validation thresholds, collision retry behavior, response bodies, and error mapping will be designed in Functional Design.

```ts
type LinkRecord = {
  code: string;
  destinationUrl: string;
  createdAt: Date;
  clickCount: number;
};

type LinkMetadata = {
  code: string;
  url: string;
  createdAt: string;
  clickCount: number;
};

type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

interface UrlValidator {
  validateDestinationUrl(value: unknown): ValidationResult<URL>;
  validateCode(value: unknown): ValidationResult<string>;
}

interface ShortCodeGenerator {
  generate(): string;
}

interface LinkRepository {
  has(code: string): boolean;
  insert(record: LinkRecord): void;
  findByCode(code: string): LinkRecord | undefined;
  incrementClickCount(code: string): LinkRecord | undefined;
}

interface LinkService {
  create(destinationUrl: URL): LinkMetadata;
  resolveAndCount(code: string): LinkRecord | undefined;
  getMetadata(code: string): LinkMetadata | undefined;
}
```

## HTTP Handler Contracts

- `createUrlHandler`: accepts a validated request body; returns a creation response or a safe client-error response.
- `redirectHandler`: accepts a validated code; resolves and counts it; returns HTTP 302 or safe 404.
- `getMetadataHandler`: accepts a validated code; returns JSON metadata or safe 404.
- `rateLimitMiddleware`: applies the approved 100-request, 15-minute policy before public handlers.
- `errorHandler`: catches unhandled handler errors, logs non-sensitive context, and returns a generic 500 response.
