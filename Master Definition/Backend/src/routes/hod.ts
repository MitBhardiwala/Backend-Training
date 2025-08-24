import express from "express";
import {
  fetchAllStudents,
  updateLeaveStatus,
  fetchAllFaculties,
  fetchStats,
} from "../controllers/hod.ts";

import { upload } from "../lib/multerConfig.ts";
import {
  createUser,
  deleteUser,
  updateUserDetails,
} from "../controllers/user.ts";
import { fetchAllLeavesRequests } from "../lib/leaveUtils.ts";

const router = express.Router();

//student management

//get all students ( hod will be able to view the student details only of its own department)
router.get("/allStudents", fetchAllStudents);

//fetch leave request received
router.get("/leaveRequests", fetchAllLeavesRequests);

//create user
router.post("/createUser", upload.single("image"), createUser);

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
