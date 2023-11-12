import User from "../Models/User.model.js";
import { createToken } from "../utils/SecretToken.js";
import bcrypt from "bcrypt";

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
    res.status(201).json({ message: "User created successfully", success: true, user });
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
    res.status(200).json({ message: "User logged in successfully", success: true, user });
    next();
  } catch (err) {
    console.error(err);
  }
};

export { Signup, login };
