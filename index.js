import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import authenticate from "./middleware/authentication.js";
import categoryRouter from "./routers/categoryRouter.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(authenticate);

// database connection
mongoose.connect(process.env.CONNECTION_STRING).then(() => console.log("Database connection success")).catch(() => console.log("Database connection fail"));

// Routers
app.use("/api/user" ,userRouter);
app.use("/api/category", categoryRouter);

app.listen(5000, (req, res) => {
    console.log("The program runs on port 5000");
})