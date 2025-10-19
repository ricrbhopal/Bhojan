import express from "express";
import { AddMenuItems } from "../controller/resturantController.js";
import { ResturantProtect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Restaurant Route Working" });
});

router.post(
  "/addMenuItems",
  ResturantProtect,
  upload.single("dishImage"),
  AddMenuItems
);



export default router;
