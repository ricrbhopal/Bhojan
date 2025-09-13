import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/config/db.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Connected and Working" });
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log("Server Started at", port);
  connectDB();
});
