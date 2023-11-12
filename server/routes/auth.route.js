import {login, Signup} from "../controllers/auth.controller.js";
import express from "express";
import userVerification from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.post("/", userVerification);

export default router;
