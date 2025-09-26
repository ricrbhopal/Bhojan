import express from "express";
import { Update } from "../controller/userController.js";
import multer from "multer";
import { Protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

const upload = multer();

router.put("/update",Protect ,upload.single("photo"), Update);

export default router;