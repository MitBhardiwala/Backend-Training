import express from "express";
import { upload } from "../lib/multerConfig.ts";
import { fetchAllStudents, updateLeaveStatus } from "../controllers/hod.ts";
import { deleteUser, updateUserDetails } from "../controllers/user.ts";
import {
  createStudent,
  fetchAllLeaves,
  fetchHodList,
} from "../controllers/faculty.ts";
import {
  createLeaveApplication,
  fetchLeaveBalance,
  fetchLeaveDetails,
} from "../lib/leaveUtils.ts";

const router = express.Router();

//create student
router.post("/createStudent", upload.single("image"), createStudent);

//update student
router.put("/user/:userId", upload.single("image"), updateUserDetails);

//delete student
router.delete("/user/:userId", upload.single("image"), deleteUser);

//fetch all students
router.get("/allStudents", fetchAllStudents);

//apply leave requests
router.post("/applyLeave", (req, res) => {
  return createLeaveApplication(req, res, "Faculty");
});

//fetch hod list
router.get("/hodList", fetchHodList);

//view student leave requests
router.get("/leaveRequests", fetchAllLeaves);

//approve/update leave requests
router.put("/updateLeaveStatus", updateLeaveStatus);

//view status
router.get("/leaveStatus", fetchLeaveDetails);

//view leave balance
router.get("/leaveBalance", fetchLeaveBalance);



export default router;
