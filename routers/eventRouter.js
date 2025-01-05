import express from "express"
import { findById, findByName, persist, retrieve } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.post("/", persist);

eventRouter.get("/", retrieve);

eventRouter.get("/name/:name", findByName);

eventRouter.get("/id/:id", findById);

export default eventRouter;

