import { client } from "../client.js";

client.logInfo(
  {
    message: "User successfully registered with email john.doe@example.com",
    context: "UserService:Registration",
  },
  (error, response) => {
    if (error) {
      console.error("Error logging info:", error);
      process.exit(1);
    } else {
      console.log("Info logged successfully:", response);
      process.exit(0);
    }
  }
);
