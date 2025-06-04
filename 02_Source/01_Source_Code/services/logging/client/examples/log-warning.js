import { client } from "../client.js";

client.logWarning(
  {
    message: "Disk space is running low on server 'prod-db-01'.",
    context: "StorageService:DiskMonitor",
  },
  (error, response) => {
    if (error) {
      console.error("Error logging warning:", error);
      process.exit(1);
    } else {
      console.log("Warning logged successfully:", response);
      process.exit(0);
    }
  }
);
