import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import AuthRouter from "./src/routes/authRouter.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/auth", AuthRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Connected and Working" });
});

app.use((err, req, res, next) => {
  const errorMessage = err.message || "Internal Server Error";
  const errorStatus = err.statusCode || 500;

  res.status(errorStatus).json({ message: errorMessage });
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log("Server Started at", port);
  connectDB();
});
