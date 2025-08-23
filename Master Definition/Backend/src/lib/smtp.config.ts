import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";

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

// Configure Handlebars plugin for Nodemailer
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve("./templates/"),
      defaultLayout: "",
    },
    viewPath: path.resolve("./src/templates/"), 
    extName: ".hbs",
  })
);
