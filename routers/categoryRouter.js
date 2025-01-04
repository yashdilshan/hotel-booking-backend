import express from "express"
import { findByName, persist, retrieve, update } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", persist);

categoryRouter.get("/", retrieve);

categoryRouter.get("/find/:name", findByName);

categoryRouter.put("/", update);

export default categoryRouter;