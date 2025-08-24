import express from "express";
import {
  fetchLeaveReport,
  fetchStats,
  fetchAllHods,
  fetchAllStudents,
  fetchAllFaculties,
} from "../controllers/admin.ts";
import { upload } from "../lib/multerConfig.ts";
import {
  createUser,
  deleteUser,
  updateUserDetails,
} from "../controllers/user.ts";

const router = express.Router();

//create users
router.post("/createUser", upload.single("image"), createUser);

//update user - student,faculty,hod
router.put("/user/:userId", upload.single("image"), updateUserDetails);

//delete user - student,faculty,hod
router.delete("/user/:userId", deleteUser);

//leave Report
router.get("/leaveReport", fetchLeaveReport);

//stats
router.get("/stats", fetchStats);

//fetch all Hods
router.get("/allHods", fetchAllHods);

//fetch all Students
router.get("/allStudents", fetchAllStudents);

//fetch all Faculties
router.get("/allFaculties", fetchAllFaculties);

export default router;
