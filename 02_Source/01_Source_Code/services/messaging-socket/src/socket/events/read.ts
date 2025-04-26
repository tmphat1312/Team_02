import { Server, Socket } from "socket.io";

export function readEvent(io: Server, socket: Socket) {
  socket.on("read", (data) => {
    console.log("Message read by user:", data);

    socket.emit("message", { text: "Message read by user: " + data.userId });
  });
}

export default readEvent;