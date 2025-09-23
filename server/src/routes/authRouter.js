import express from "express";
import {
  Register,
  Login,
  Logout,
  ResetPassword,
  SendOTP,
  verifyOTP,
  ForgetPassword,
} from "../controller/authController.js";
import { Protect, ProtectFP } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.patch("/resetpassword", Protect, ResetPassword);

router.post("/sendOtp", SendOTP);
router.post("/verifyOtp", verifyOTP);
router.post("/forgetpassword", ProtectFP, ForgetPassword);

export default router;
