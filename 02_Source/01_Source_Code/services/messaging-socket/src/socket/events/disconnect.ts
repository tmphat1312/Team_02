import { Server, Socket } from "socket.io";

export function disconnectEvent(io: Server, socket: Socket) {
  socket.on("disconnect", (data) => {
    io.disconnectSockets(true);
    console.log("----------------------");
  });
}

export default disconnectEvent;