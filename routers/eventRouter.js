import express from "express"
import { persist, retrieve } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.post("/", persist);

eventRouter.get("/", retrieve);

export default eventRouter;

