import express from "express"
import { login, persist } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", persist);

userRouter.post("/login", login);

export default userRouter