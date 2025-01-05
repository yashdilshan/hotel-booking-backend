import express from "express"
import { findByName, persist, retrieve } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.post("/", persist);

eventRouter.get("/", retrieve);

eventRouter.get("/name/:name", findByName);

export default eventRouter;

