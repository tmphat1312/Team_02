import { Server, Socket } from "socket.io";

export function disconnectEvent(io: Server, socket: Socket) {
  socket.on("disconnect", () => {
    io.disconnectSockets(true);
  });
}

export default disconnectEvent;