import express from "express"
import { persist, retrieve } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", persist);

reviewRouter.get("/", retrieve);

export default reviewRouter;
