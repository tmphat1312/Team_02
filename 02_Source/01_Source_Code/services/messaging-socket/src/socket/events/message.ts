import { Server, Socket } from "socket.io";
import { db } from "../../db";
import { conversationTable, messageTable } from "../../db/schema";
import { eq, and } from 'drizzle-orm';

export function messageEvent(io: Server, socket: Socket) {
  socket.on("message", async (data) => {
    const { conversationId, senderId, content } = data;
    const [conversation] = await db
      .select()
      .from(conversationTable)
      .where(eq(conversationTable.id, conversationId));

    const newMessage = await db
      .insert(messageTable)
      .values({
        conversationId: Number(conversationId),
        senderId: senderId.toString(),
        receiverId: conversation.hostId == senderId ? conversation.tenantId.toString() : conversation.hostId.toString(),
        content,
        sendAt: new Date(),
        isReadByReceiver: false,
      })
      .returning();
    console.log(socket.rooms)
    socket.to(conversationId).emit("message", {
      data: newMessage,
    });
  });
}

export default messageEvent;