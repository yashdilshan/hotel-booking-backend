import express from "express"
import { changePassword, findByContactNo, findByToken, login, persist, remove, retrieve, update } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", persist);

userRouter.post("/login", login);

userRouter.get("/", retrieve);

userRouter.get("/token", findByToken);

userRouter.get("/contactNo/:contactNo", findByContactNo);

userRouter.delete("/:id", remove);

userRouter.put("/", update);

userRouter.put("/password", changePassword);

export default userRouter