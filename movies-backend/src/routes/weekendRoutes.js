import express from "express";
import { toggleWeekendPick,getWeekendPicks } from "../controllers/weekendController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/toggle", authMiddleware, toggleWeekendPick);
router.get("/", authMiddleware, getWeekendPicks);  

export default router;
