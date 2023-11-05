import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
 import authRoute from "./Routes/Auth.route.js";
dotenv.config();

const{MONGO_URL,PORT } = process.env;
const app = express();

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
}).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,

}
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use('/',authRoute)