import express from "express";
import {
  createFaculty,
  createHod,
  createStudent,
  fetchLeaveReport,
  fetchStats,
  fetchAllHods,
} from "../controllers/admin.ts";
import { upload } from "../lib/multerConfig.ts";
import { deleteUser, updateUserDetails } from "../controllers/user.ts";

const router = express.Router();

//create users
//create student
router.post("/createStudent", upload.single("image"), createStudent);

//create faculty
router.post("/createFaculty", upload.single("image"), createFaculty);

//create hod
router.post("/createHod", upload.single("image"), createHod);

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

export default router;
