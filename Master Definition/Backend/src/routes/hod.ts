import express from "express";
import {
  fetchAllStudents,
  createStudent,
  updateLeaveStatus,
  fetchAllFaculties,
  createFaculty,
  fetchAllLeaveRequests,
  fetchStats,
} from "../controllers/hod.ts";

import { upload } from "../lib/multerConfig.ts";
import { deleteUser, updateUserDetails } from "../controllers/user.ts";

const router = express.Router();

//student management

//get all students ( hod will be able to view the student details only of its own department)
router.get("/allStudents", fetchAllStudents);

//fetch leave request of students
router.get("/leaveRequests", fetchAllLeaveRequests);

//create student
router.post("/createStudent", upload.single("image"), createStudent);

//create faculty
router.post("/createFaculty", upload.single("image"), createFaculty);

//update student or faculty
router.put("/user/:userId", upload.single("image"), updateUserDetails);

//delete student or faculty
router.delete("/user/:userId", deleteUser);

//update student or faculty leave status
router.put("/updateLeaveStatus", updateLeaveStatus);

//faculty management

//get all faculties
router.get("/allFaculties", fetchAllFaculties);

//hod stats
router.get("/stats", fetchStats);

export default router;
