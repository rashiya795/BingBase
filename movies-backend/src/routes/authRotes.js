import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/test", (req, res) => {
  res.json({ message: "✅ Auth API is working" });
});
export default router;
