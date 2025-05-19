import "dotenv/config";

import { createTransport } from "nodemailer";

export const mailClient = createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
