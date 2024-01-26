import { Router } from "express";
import {
  fetchBalance,
  transferAmount,
} from "../controllers/account.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/balance", authMiddleware, fetchBalance);
router.post("/transfer", authMiddleware, transferAmount);

export default router;
