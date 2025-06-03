import { join } from "path";
import { mkdirSync } from "fs";

const __dirname = new URL(".", import.meta.url).pathname;

mkdirSync(join(__dirname, "bin"), { recursive: true });

const eventsStorePath = join(__dirname, "bin/event-store.json");
const materializedDBPath = join(__dirname, "bin/materialized-db.sqlite");

export const projectConfig = {
  __dirname,
  eventsStorePath,
  materializedDBPath,
};
