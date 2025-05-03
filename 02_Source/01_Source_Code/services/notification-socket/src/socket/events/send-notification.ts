import { Server, Socket } from "socket.io";

export function subscribeEvent(io: Server, socket: Socket) {
  socket.on("send-notification", (data) => {
    console.log("receive data: ", data)
    io.to(data.userId).emit("notification", {
      ...data
    });
  });
}

export default subscribeEvent;
