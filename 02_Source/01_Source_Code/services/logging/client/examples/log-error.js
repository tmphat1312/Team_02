import { client } from "../client.js";

client.logError(
  {
    message: "Failed to connect to the database during user authentication.",
    context: "AuthService:DatabaseConnection",
  },
  (error, response) => {
    if (error) {
      console.error("Error logging error:", error);
      process.exit(1);
    } else {
      console.log("Error logged successfully:", response);
      process.exit(0);
    }
  }
);
