import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { projectConfig } from "../project.config.js";
import * as LoggerService from "./services/logger-service.js";

const packageDefinition = loadSync(projectConfig.protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const { Logger } = loadPackageDefinition(packageDefinition).logging;

const server = new Server();
server.addService(Logger.service, LoggerService);
server.bindAsync(
  "127.0.0.1:50051",
  ServerCredentials.createInsecure(),
  (_, port) => {
    console.log(`Server running at :${port}`);
  }
);
