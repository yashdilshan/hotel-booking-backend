import express from "express"
import { findByName, persist, retrieve } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", persist);

reviewRouter.get("/", retrieve);

reviewRouter.get("/find/:name", findByName);

export default reviewRouter;
