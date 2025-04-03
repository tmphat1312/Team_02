import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

const PROTO_DIR = path.resolve(__dirname, "proto");

const OUT_DIR = path.resolve(__dirname, "generated");

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

const command = `
  npx grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${OUT_DIR} \
  --grpc_out=grpc_js:${OUT_DIR} \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=grpc_js:${OUT_DIR} \
  -I ${PROTO_DIR} \
  ${PROTO_DIR}/*.proto
`;

console.log("Generating from proto");
execSync(command, { stdio: "inherit" });
console.log("Successfully generated proto");

// validate
// npx grpc_tools_node_protoc \
//   --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
//   --plugin=protoc-gen-validate=./node_modules/.bin/protoc-gen-validate \
//   --plugin=protoc-gen-validate=./node_modules/.bin/buf \
//   --js_out=import_style=commonjs,binary:./generated \
//   --grpc_out=grpc_js:./generated \
//   --ts_out=grpc_js:./generated \
//   -I ./proto -I ./third_party \
// ./proto/*.proto ./third_party/validate/*.proto
