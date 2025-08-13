import student from "../routes/student.ts";
import hod from "../routes/hod.ts";
import faculty from "../routes/faculty.ts";
import user from "../routes/user.ts";
import admin from "../routes/admin.ts";
import express from "express";
import { upload } from "../lib/multerConfig.ts";
import {
  authenticateAdmin,
  authenticateFaculty,
  authenticateHod,
  authenticateToken,
  checkDeptAssigned,
} from "../middleware/authMiddleware.ts";

const router = express.Router();

//user routes
router.use("/user", user);

//student routes
router.use("/student", upload.single("image"), student);

//hod routes
router.use("/hod", authenticateToken, authenticateHod, checkDeptAssigned, hod);

//faculty routes
router.use(
  "/faculty",
  authenticateToken,
  authenticateFaculty,
  checkDeptAssigned,
  faculty
);

//Admin routes
router.use("/admin", authenticateToken, authenticateAdmin, admin);

export default router;
