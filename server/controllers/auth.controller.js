import User from "../models/user.model.js";
import {createToken} from "../utils/SecretToken.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import mailgen from "mailgen";
import sendEmail from "../utils/Mailer.js";

const Signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne().or([{ email }, { username }]);
    if (existingUser) {
      return res.status(400).json({ message: "юзер с таким именем или почтой уже существует" });
    }
    const userDataToSend = {
      email,
      username,
      password,
      createdAt: Date.now(),
      role: "USER",
    };
    const user = await User.create(userDataToSend);
    const token = createToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    const emailMessage = `Вітаємо ${userDataToSend.username}  зареєструйтесь у нас.`

    const mailGenerator = new mailgen({
      theme: "neopolitan",
      product: {
        name: "Mailgen",
        link : 'https://mailgen.js/',
      },
    });

    const response = {
      body: {
        name : "Daily Tuition",
        intro: "Your bill has arrived!",
        table : {
          data : [
            {
              item : "Nodemailer Stack Book",
              description: "A Backend application",
              price : "$10.99",
            }
          ]
        },
        outro: "Looking forward to do more business"
      }
    };

    const mail = mailGenerator.generate(response);

    try{
      const emailInfo = await sendEmail(
          user.email, // Кому
          "Ласкаво просимо до вашого застосунку", // Ваш текст
          emailMessage, // Текстове тіло
          mail, // HTML тіло
      );
      const response = {
        message: "Користувач успішно створений",
        success: true,
        user,
      };
      if (emailInfo) {
        response.emailInfo = {
          messageId: emailInfo.messageId,
          preview: nodemailer.getTestMessageUrl(emailInfo),
        };
      }
      res.status(201).json(response);
    }catch(emailError){
      console.error("Email sending error:", emailError);
      res.status(500).json({ message: "Помилка відправки листа" });
    }


    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "all fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "incorrect password or email" });
    }
    const token = createToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(200)
      .json({ message: "User logged in successfully", success: true, user, otherData: nodemailer.getTestMessageUrl() });

    next();
  } catch (err) {
    console.error(err);
  }
};

export { Signup, login };
