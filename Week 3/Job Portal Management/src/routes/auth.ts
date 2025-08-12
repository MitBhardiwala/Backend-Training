import express from "express";
import { loginUser, registerUser } from "../controllers/auth.ts";
import {
  authenticateToken,
  fetchUserDetails,
} from "../middleware/authMiddleware.ts";

const router = express.Router();

//register
router.post("/register", registerUser);

//login
router.post("/login", loginUser);

//get user details
router.get("/getUserDetails", authenticateToken, fetchUserDetails);

export default router;
