import express from "express"
import { persist } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", persist);

export default reviewRouter;
