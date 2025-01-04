import express from "express"
import { persist, retrieve } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", persist);

categoryRouter.get("/", retrieve);

export default categoryRouter;