import { z } from "zod";

import { SHORT_CODE_LENGTH } from "./codes";

const maximumUrlLength = 2048;
const codePattern = new RegExp(`^[A-Za-z0-9]{${SHORT_CODE_LENGTH}}$`);

export const createUrlSchema = z
  .object({
    url: z.string().min(1).max(maximumUrlLength),
  })
  .strict();

export function parseDestinationUrl(value: unknown): URL | undefined {
  const parsed = createUrlSchema.safeParse({ url: value });

  if (!parsed.success) {
    return undefined;
  }

  try {
    const url = new URL(parsed.data.url);
    return url.protocol === "http:" || url.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}

export function isValidCode(value: unknown): value is string {
  return typeof value === "string" && codePattern.test(value);
}
