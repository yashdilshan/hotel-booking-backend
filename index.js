import express from "express"

const app = express();

app.listen(5000, (req, res) => {
    console.log("The program runs on port 5000");
})