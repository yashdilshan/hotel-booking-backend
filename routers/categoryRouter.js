import express from "express"
import { persist } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", persist);

export default categoryRouter;