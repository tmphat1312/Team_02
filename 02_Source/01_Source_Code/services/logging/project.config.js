import path from "path";

import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const protoPath = path.join(__dirname, "logger.proto");

export const projectConfig = {
  __dirname,
  __filename,
  protoPath,
};
