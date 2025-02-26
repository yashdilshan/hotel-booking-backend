import express from "express"
import { enableDisable, findByEmail, findByName, persist, remove, retrieve, update } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", persist);

reviewRouter.get("/", retrieve);

reviewRouter.get("/name/:name", findByName);

reviewRouter.get("/email/:email", findByEmail);

reviewRouter.put("/", update);

reviewRouter.put("/disabled", enableDisable);

reviewRouter.delete("/:id", remove);

export default reviewRouter;
