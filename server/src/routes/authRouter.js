import express from "express";
import {
  Register,
  Login,
  Logout,
  ResetPassword,
  SendOTP
} from "../controller/authController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.patch("/resetpassword", Protect, ResetPassword);

router.post("/sendOtp",SendOTP)

export default router;
