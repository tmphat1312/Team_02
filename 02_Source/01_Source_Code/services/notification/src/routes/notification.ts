import { Hono } from "hono";
import { db } from "../db";
import { notificationTable } from "../db/schema";
import { eq, desc, or } from "drizzle-orm";
import { created, badRequest, ok, noContent } from "../utils/json-helpers";
import { ErrorCode } from "../constants/error-codes";
import nodemailer from "nodemailer";
import axios from "axios";

export const notificationRoute = new Hono();

notificationRoute.get("/", async (c) => {
  const userId = c.req.query("userId");
  if (!userId) {
    const notifications = await db
      .select()
      .from(notificationTable)
      .orderBy(desc(notificationTable.sendAt));

    return ok(c, notifications);
  } else {
    const notifications = await db
      .select()
      .from(notificationTable)
      .where(eq(notificationTable.userId, userId))
      .orderBy(desc(notificationTable.sendAt));

    return ok(c, notifications);
  }
});

notificationRoute.post("/", async (c) => {
  const type = c.req.query("type");

  if (
    !type ||
    (type.toLowerCase() !== "email" && type.toLowerCase() !== "in-app")
  ) {
    return badRequest(
      c,
      "Type must be email or in-app",
      ErrorCode.MISSING_NOTIFICATION_TYPE
    );
  }

  const notificationType = type.toLowerCase() as "email" | "in-app";

  const { userId, title, message } = await c.req.parseBody<{
    userId: string;
    title: string;
    message: string;
  }>();

  if (!userId) {
    return badRequest(
      c,
      "User ID is required!",
      ErrorCode.MISSING_NOTIFICATION_USER_ID
    );
  }
  if (!title) {
    return badRequest(
      c,
      "Title is required!",
      ErrorCode.MISSING_NOTIFICATION_TITLE
    );
  }
  if (!message) {
    return badRequest(
      c,
      "Message is required!",
      ErrorCode.MISSING_NOTIFICATION_MESSAGE
    );
  }
  if (type === "email") {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: Bun.env.GMAIL_APP_USER,
        pass: Bun.env.GMAIL_APP_PASSWORD,
      },
    });
    if (!Bun.env.USER_SERVICE_API_URL) {
      return badRequest(
        c,
        "User service API URL is not set!",
        ErrorCode.MISSING_USER_SERVICE_API_URL
      );
    }
    if (!Bun.env.PATH_FETCH_EMAIL_FROM_USER_ID) {
      return badRequest(
        c,
        "Path to fetch email from user ID is not set!",
        ErrorCode.MISSING_USER_SERVICE_API_URL_PATH
      );
    }

    const response = await axios.get(
      `${Bun.env.USER_SERVICE_API_URL}${Bun.env.PATH_FETCH_EMAIL_FROM_USER_ID}?userId=${userId}`
    );

    if (response.status !== 200) {
      return badRequest(
        c,
        `${response.data.error.message}`,
        ErrorCode.NOT_FOUND_EMAIL_FROM_USER_ID
      );
    }
    const email = response.data.data.email;

    const mailOptions = {
      from: email,
      to: email,
      subject: title,
      html: `<p>${message}<p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    if (!info) {
      return badRequest(c, "Send email failed!", ErrorCode.SEND_EMAIL_FAILED);
    }
  }
  const [notification] = await db
    .insert(notificationTable)
    .values({
      userId,
      title,
      message,
      type: notificationType,
      sendAt: new Date(),
      isRead: false,
    })
    .returning();
  return created(c, {
    id: notification.id,
    createdAt: notification.sendAt,
  });
});

notificationRoute.post("/:id/read", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  if (!id) {
    return badRequest(c, "ID is required!", ErrorCode.MISSING_NOTIFICATION_ID);
  }
  const [notification] = await db
    .update(notificationTable)
    .set({ isRead: true, readAt: new Date() })
    .where(eq(notificationTable.id, id))
    .returning();
  if (!notification) {
    return badRequest(c, "Notification not found!", ErrorCode.NOT_FOUND);
  }
  return ok(c, {
    id: notification.id,
    readAt: notification.readAt,
  });
});

notificationRoute.delete("/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  if (!id) {
    return badRequest(c, "ID is required!", ErrorCode.MISSING_NOTIFICATION_ID);
  }
  const [notification] = await db
    .delete(notificationTable)
    .where(eq(notificationTable.id, id))
    .returning();
  if (!notification) {
    return badRequest(c, "Notification not found!", ErrorCode.NOT_FOUND);
  }
  return ok(c, {
    id: notification.id,
    deletedAt: new Date(),
  });
});
