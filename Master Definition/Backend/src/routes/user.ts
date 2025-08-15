import express from "express";
import {
  loginUser,
  requestPasswordReset,
  updateUser,
  resetPassword,
  fetchUser,
  fetchUserLeaveBalance,
  getUserById,
  fetchLeaveHistory,
} from "../controllers/user.ts";
import { authenticateToken } from "../middleware/authMiddleware.ts";
import { upload } from "../lib/multerConfig.ts";

const router = express.Router();

//user login ( student, faculty, hod and admin)

router.post("/login", loginUser);
router.put("", upload.single("image"), authenticateToken, updateUser);
router.get("", authenticateToken, fetchUser);
router.post("/requestPasswordReset", requestPasswordReset);
router.post("/resetPassword", resetPassword);

router.get("/leaveBalance/:userId", fetchUserLeaveBalance);
router.get("/leaveHistory", authenticateToken, fetchLeaveHistory);
router.get("/:id", getUserById);


export default router;
