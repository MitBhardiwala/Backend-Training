import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";

configDotenv();

const SMTP_EMAIL = process.env.SMTP_USER_MAIL;
const SMTP_PASS = process.env.SMTP_USER_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASS,
  },
});
