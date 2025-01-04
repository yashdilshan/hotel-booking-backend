import express from "express"
import { findByName, persist, remove, retrieve, update } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", persist);

categoryRouter.get("/", retrieve);

categoryRouter.get("/find/:name", findByName);

categoryRouter.put("/", update);

categoryRouter.delete("/:id", remove);

export default categoryRouter;