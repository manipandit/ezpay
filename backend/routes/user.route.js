import { Router } from "express";
import {
  signup,
  signin,
  findUser,
  updateInfo,
  currentUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// signup and sigin user
router.post("/signup", signup);
router.post("/signin", signin);

// get current user
router.get("/currentUser", authMiddleware, currentUser);

// update user profile
router.put("/", authMiddleware, updateInfo);

// find user by fname or lname
router.get("/bulk", authMiddleware, findUser);

export default router;
