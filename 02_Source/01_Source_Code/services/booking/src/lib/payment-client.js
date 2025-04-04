import "dotenv/config";
import { dirname } from "node:path";

const rootDir = dirname(process.argv[1]);
const PROTO_PATH = rootDir + "/payment.proto";

import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const packageDef = loadSync(PROTO_PATH, {});
const grpcDescriptor = loadPackageDefinition(packageDef);
const paymentPackage = grpcDescriptor.paymentPackage;

const client = new paymentPackage.Payment(
  process.env.PAYMENT_SERVICE_HOST,
  credentials.createInsecure()
);

export function createPayment({ amount, currency, userId }) {
  return new Promise((resolve, reject) => {
    client.createPayment({ amount, currency, userId }, (error, response) => {
      if (error) {
        console.error("Error occurred: " + error.message);
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}
