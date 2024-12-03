import express from "express"
import { login, persist, retrieveByToken } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", persist);

userRouter.post("/login", login);

userRouter.get("/token", retrieveByToken);

export default userRouter;