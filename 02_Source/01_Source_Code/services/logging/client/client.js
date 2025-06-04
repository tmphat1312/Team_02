import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { projectConfig } from "../project.config.js";

const packageDefinition = loadSync(projectConfig.protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const { Logger } = loadPackageDefinition(packageDefinition).logging;

export const client = new Logger(
  "localhost:8003",
  credentials.createInsecure()
);
