import express from "express";
import {
  AdminLogin,
  AddResturant,
  GetAllResturants,
} from "../controller/adminController.js";
import { AdminProtect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const upload = multer();

router.post("/login", AdminLogin);
router.get("/getallresturants", AdminProtect, GetAllResturants);
router.post(
  "/addResturant",
  AdminProtect,
  upload.fields([{ name: "managerImage" }, { name: "restaurantImages" }]),
  AddResturant
);

export default router;
