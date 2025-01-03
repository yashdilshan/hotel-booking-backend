import express from "express"
import { findByContactNo, findByToken, login, persist, retrieve } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", persist);

userRouter.post("/login", login);

userRouter.get("/", retrieve);

userRouter.get("/token", findByToken);

userRouter.get("/contactNo/:contactNo", findByContactNo);

export default userRouter