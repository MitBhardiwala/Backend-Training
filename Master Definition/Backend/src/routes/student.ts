import express, { type Request, type Response } from "express";
import {
  fetchFacultyAndHodList,
  registerUser,
  updateStudent,
} from "../controllers/student.ts";
import {
  authenticateToken,
  checkDeptAssigned,
} from "../middleware/authMiddleware.ts";
import { createLeaveApplication, fetchLeaveBalance, fetchLeaveDetails } from "../lib/leaveUtils.ts";

const router = express.Router();


//register
router.post("/register", (req: Request, res: Response) => {
  registerUser(req, res);
});


//update profile
router.put("", authenticateToken, updateStudent);

//apply for leave
router.post("/applyLeave", authenticateToken, checkDeptAssigned, (req, res) => {
  return createLeaveApplication(req, res);
});

//fetch faculties or hod to whom student can apply leave(only of same department)
router.get("/facultyAndHodList",authenticateToken,fetchFacultyAndHodList)


export default router;
