const PROTO_PATH = "payment.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcDescriptor = grpc.loadPackageDefinition(packageDef);
const paymentPackage = grpcDescriptor.paymentPackage;

const server = new grpc.Server();

server.addService(paymentPackage.Payment.service, {
  createPayment: createPayment,
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (_, port) => console.log(`Server running at http://0.0.0.0:${port}`)
);

function createPayment(call, callback) {
  const payment = call.request;

  console.log("Payment received:", payment);

  // Simulate payment processing
  setTimeout(() => {
    const response = {
      status: "SUCCESS",
      transactionId: Date.now(),
      message: "Payment processed successfully",
    };
    callback(null, response);
  }, 2000);
}
