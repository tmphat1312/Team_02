import { Server, Socket } from "socket.io";
import { readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function setupSocket(io: Server) {
  io.on("connection", async (socket: Socket) => {

    const eventFiles = readdirSync(join(__dirname, "events"));
    for (const file of eventFiles) {
      if (file.endsWith(".ts") || file.endsWith(".js")) {

        const eventModule = await import(`./events/${file}`);
        if (typeof eventModule.default === "function") {
          eventModule.default(io, socket);
        }
      }
    } 
  });
}

export default setupSocket;