import express, { type Request, type Response } from "express";
import {
  registerUser,
  fetchStudent,
  updateStudent,
} from "../controllers/student.ts";
import {
  authenticateToken,
  checkDeptAssigned,
} from "../middleware/authMiddleware.ts";
import { createLeaveApplication, fetchLeaveBalance, fetchLeaveDetails } from "../lib/leaveUtils.ts";

const router = express.Router();

// Initialize Multer with the storage engine

//register
router.post("/register", (req: Request, res: Response) => {
  registerUser(req, res);
});

//view profile
router.get("", authenticateToken, fetchStudent);

//update profile
router.put("", authenticateToken, updateStudent);

//apply for leave
router.post("/applyLeave", authenticateToken, checkDeptAssigned, (req, res) => {
  return createLeaveApplication(req, res);
});

//view status
router.get(
  "/leaveStatus",
  authenticateToken,
  checkDeptAssigned,
  fetchLeaveDetails
);

//view leave balance
router.get("/leaveBalance", authenticateToken, fetchLeaveBalance);
export default router;
