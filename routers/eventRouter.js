import express from "express"
import { persist } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.post("/", persist);

export default eventRouter;

