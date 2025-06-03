import { Server, Socket } from "socket.io";
import { db } from "../../db";
import { notificationTable } from "../../db/schema";
import { eq, and } from 'drizzle-orm';

export function readEvent(io: Server, socket: Socket) {
  socket.on("read", async (data) => {
    const { notificationId } = data;
    const updateRead = await db
      .update(notificationTable)
      .set({ isRead: true, readAt: new Date() })
      .where(
        and(
          eq(notificationTable.id, notificationId),
          eq(notificationTable.isRead, false)  
        )
      ).returning();
    io.to(notificationId).emit("read", { message: `Notification ${notificationId} was read message` });
  });
}

export default readEvent;