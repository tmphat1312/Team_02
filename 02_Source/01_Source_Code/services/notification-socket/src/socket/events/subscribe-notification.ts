import { Server, Socket } from "socket.io";

export function subscribeEvent(io: Server, socket: Socket) {
  socket.on("subscribe-notification", (data) => {
    const { userId } = data;
    socket.join(userId); 
    io.to(userId).emit("subscribe-notification", {
      roomId: userId,
      message: `User ${userId} join this room`,
    });
  });
}

export default subscribeEvent;
