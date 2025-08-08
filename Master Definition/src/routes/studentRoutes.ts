import express from "express";
import {
  registerStudent,
  fetchStudent,
  updateStudent,
  createLeaveApplication,
  fetchLeaveDetails,
  fetchLeaveBalance
} from "../controllers/studentControllers.ts";
import { authenticateToken } from "../middleware/authMiddleware.ts";
import multer from "multer";

const router = express.Router();

// Initialize Multer with the storage engine

//register
router.post("/register", registerStudent);

//view profile
router.get("", authenticateToken, fetchStudent);

//update profile
router.put("", authenticateToken, updateStudent);

//apply for leave
router.post("/applyLeave", authenticateToken, createLeaveApplication);

//view status
router.get("/leaveStatus", authenticateToken, fetchLeaveDetails);

//view leave balance
router.get("/leaveBalance",authenticateToken,fetchLeaveBalance)
export default router;
