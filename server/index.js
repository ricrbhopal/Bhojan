import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import cloudinary from "./src/config/cloudinary.js";

// Importing other routers
import AuthRouter from "./src/routes/authRouter.js";
import UserRouter from "./src/routes/userRouter.js";
import AdminRouter from "./src/routes/adminRouter.js";
import PublicRouter from "./src/routes/publicRouter.js";
import ResturantRouter from "./src/routes/resturantRouter.js";


const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/admin", AdminRouter);
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/public", PublicRouter);
app.use("/resturant", ResturantRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Connected and Working" });
});

app.use((err, req, res, next) => {
  const errorMessage = err.message || "Internal Server Error";
  const errorStatus = err.statusCode || 500;

  res.status(errorStatus).json({ message: errorMessage });
});

const port = process.env.PORT || 4500;

app.listen(port, async () => {
  console.log("Server Started at", port);
  connectDB();
  try {
    const res = await cloudinary.api.ping();
    console.log("Cloudinary Connected", res);
  } catch (error) {
    console.error("Cloudinary Connection Error:", error);
  }
});
