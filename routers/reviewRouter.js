import express from "express"
import { findByEmail, findByName, persist, retrieve } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", persist);

reviewRouter.get("/", retrieve);

reviewRouter.get("/name/:name", findByName);

reviewRouter.get("/email/:email", findByEmail);

export default reviewRouter;
