import express from "express"
import { findById, findByName, persist, remove, retrieve, update } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.post("/", persist);

eventRouter.get("/", retrieve);

eventRouter.get("/name/:name", findByName);

eventRouter.get("/id/:id", findById);

eventRouter.put("/", update);

eventRouter.delete("/:id", remove);

export default eventRouter;

