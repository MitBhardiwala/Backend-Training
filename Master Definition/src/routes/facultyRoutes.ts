import express from "express";
import { upload } from "../lib/multerConfig.ts";
import {
  createStudent,
  fetchAllStudents,
  updateLeaveStatus,
} from "../controllers/hodControllers.ts";
import {
  deleteUser,
  updateUserDetails,
} from "../controllers/userControllers.ts";
import {
  createFacultyLeaveApplication,
  fetchAllLeaves,
} from "../controllers/facultyControllers.ts";
import {
  createLeaveApplication,
  fetchLeaveBalance,
  fetchLeaveDetails,
} from "../controllers/studentControllers.ts";

const router = express.Router();

//create student
router.post("/createStudent", upload.single("image"), createStudent);

//update student
router.put("/user/:userId", upload.single("image"), updateUserDetails);

//delete student
router.delete("/user/:userId", upload.single("image"), deleteUser);

//apply leave requests
router.post("/applyLeave", (req, res) => {
  return createLeaveApplication(req, res, "Faculty");
});

//view student leave requests
router.get("/leaveRequests", fetchAllLeaves);

//approve/update leave requests
router.put("/updateLeaveStatus", updateLeaveStatus);

//view status
router.get("/leaveStatus", fetchLeaveDetails);

//view leave balance
router.get("/leaveBalance", fetchLeaveBalance);

export default router;
