import { Server, Socket } from "socket.io";

export function messageEvent(io: Server, socket: Socket) {
  socket.on("message", (data) => {
    console.log("----------------------");
    console.log("Message message by user:", data);

    socket.emit("message", { text: "Message message by user: " + data.userId });
  });
}

export default messageEvent;