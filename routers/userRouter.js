import express from "express"
import { persist } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", persist)

export default userRouter