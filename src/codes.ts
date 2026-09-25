import { randomInt } from "node:crypto";

export const SHORT_CODE_LENGTH = 7;
const ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateShortCode(): string {
  let code = "";

  for (let index = 0; index < SHORT_CODE_LENGTH; index += 1) {
    code += ALPHANUMERIC[randomInt(0, ALPHANUMERIC.length)];
  }

  return code;
}
