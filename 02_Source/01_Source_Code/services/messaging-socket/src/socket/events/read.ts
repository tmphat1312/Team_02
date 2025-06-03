import { Server, Socket } from "socket.io";
import { db } from "../../db";
import { messageTable } from "../../db/schema";
import { eq, and } from 'drizzle-orm';

export function readEvent(io: Server, socket: Socket) {
  socket.on("read", async (data) => {
    const { userId, conversationId } = data;
    const updateRead = await db
      .update(messageTable)
      .set({ isReadByReceiver: true })
      .where(
        and(
          eq(messageTable.conversationId, conversationId),
          eq(messageTable.receiverId, userId),
          eq(messageTable.isReadByReceiver, false)  
        )
      ).returning();
    io.to(conversationId).emit("read", { message: `User ${userId} was read message` });
  });
}

export default readEvent;