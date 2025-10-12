import express from "express";
import {
  Register,
  Login,
  Logout,
  ResetPassword,
  SendOTP,
  verifyOTP,
  ForgetPassword,
  GoogleLogin,
  ResturantLogin,
  RiderLogin,
} from "../controller/authController.js";
import { Protect, ProtectFP } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/customer/login", Login);
router.post("/resturant/login", ResturantLogin);
router.post("/rider/login", RiderLogin);
router.get("/logout", Logout);
router.patch("/resetpassword", Protect, ResetPassword);

router.post("/sendOtp", SendOTP);
router.post("/verifyOtp", verifyOTP);
router.post("/forgetpassword", ProtectFP, ForgetPassword);

router.post("/googlelogin", GoogleLogin);

export default router;
