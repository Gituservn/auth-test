import { Signup, login } from "../Controllers/Auth.controller.js";
import express from "express";
import userVerification from "../Middlewares/Auth.middleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.post("/", userVerification);

export default router;
