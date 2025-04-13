import { Hono } from "hono";
import nodemailer from "nodemailer";
import { db } from "../db";
import { badRequest, ok } from "../utils/json-helpers";
import { eq } from "drizzle-orm";
import { userTable, verificationTable } from "../db/schema";
import { createId } from "@paralleldrive/cuid2";
const route = new Hono();

route.post("/send-otp", async (c) => {
  const { email } = await c.req.parseBody<{ email: string }>();

  if (!email) {
    return badRequest(c, "Email is required!");
  }

  const [existingEmail] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (!existingEmail) {
    return badRequest(c, "Email is not exist!");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: Bun.env.GMAIL_APP_USER,
      pass: Bun.env.GMAIL_APP_PASSWORD,
    },
  });

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const mailOptions = {
    from: Bun.env.GMAIL_APP_USER,
    to: email,
    subject: "Verify your email from Rento",
    html: `<p>Your verification code is <strong>${verificationCode}</strong>.</p><p>This code will expire in 5 minutes.</p>`,
  };

  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    return badRequest(c, "Send email failed!");
  }

  const [insertVerify] = await db
    .insert(verificationTable)
    .values({
      id: createId(),
      identifier: email,
      value: verificationCode,
      expiresAt,
      createdAt: new Date(),
    })
    .returning();
  if (!insertVerify) {
    return badRequest(c, "Insert verification code failed!");
  }
  return ok(c, "Send email successfully!");
});

route.post("/verify-otp", async (c) => {
  const { email, otp } = await c.req.parseBody<{
    email: string;
    otp: string;
  }>();

  if (!email) {
    return badRequest(c, "Email is required!");
  }
  if (!otp) {
    return badRequest(c, "OTP is required!");
  }

  const [existingEmail] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (!existingEmail) {
    return badRequest(c, "Email is not exist!");
  }

  const verificationList = await db
    .select()
    .from(verificationTable)
    .where(eq(verificationTable.identifier, email));

  let state = 0;

  verificationList.forEach((verification) => {
    if (otp === verification.value) {
      state = 1;
      const expiresAt = new Date(verification.expiresAt!);
      const now = new Date();
      if (now <= expiresAt) {
        state = 2;
      }
    }
  });

  if (state === 0) {
    return badRequest(c, "OTP is not valid");
  } else if (state === 1) {
    return badRequest(c, "OTP expired");
  } else {
    const [emailVerified] = await db
      .update(userTable)
      .set({ emailVerified: true, updatedAt: new Date() })
      .where(eq(userTable.email, email))
      .returning();
    if (!emailVerified) {
      return badRequest(c, "Email verification failed!");
    }
    return ok(c, "Account has been verified");
  }
});


export const verificationRoute = route;
