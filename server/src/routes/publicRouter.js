import express from "express";

import {
  ShowAllResturants,
  GetResturantMenu,
} from "../controller/publicController.js";

const router = express.Router();

router.get("/getallresturants", ShowAllResturants);
router.get("/getResturantMenu/:resturantId", GetResturantMenu);

export default router;
