import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.listen(5000, (req, res) => {
    console.log("The program runs on port 5000");
})