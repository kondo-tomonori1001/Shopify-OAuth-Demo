import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send(process.env.MESSAGE);
});
