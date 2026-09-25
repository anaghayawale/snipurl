import { createApp } from "./app";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const app = createApp();

app.listen(Number.isSafeInteger(port) && port > 0 ? port : 3000, () => {
  process.stdout.write(`SnipURL API listening on port ${Number.isSafeInteger(port) && port > 0 ? port : 3000}\n`);
});
