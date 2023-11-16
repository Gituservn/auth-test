import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const sendEmail = async (to, subject, text, html) => {
  try {
    const config = {
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    };

    const transporter = nodemailer.createTransport(config);

    const message = {
      from: process.env.GMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(message);
    return info;
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
