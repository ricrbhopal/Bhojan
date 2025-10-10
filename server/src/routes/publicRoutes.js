import express from "express";

import { ShowAllResturants } from "../controller/publicController.js";

const router = express.Router();


router.get('/getallresturants',ShowAllResturants)


export default router;