import { Server, Socket } from "socket.io";

export function subscribeEvent(io: Server, socket: Socket) {
  socket.on("subscribe", (data) => {
    const { userId, conversationId } = data;

    socket.join(conversationId); 
    io.to(conversationId).emit("subscribe", {
      roomId: conversationId,
      userId: userId,
      message: `User ${userId} join this room`,
    });
  });
}

export default subscribeEvent;
