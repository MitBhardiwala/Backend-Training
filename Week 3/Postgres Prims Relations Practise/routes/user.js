import express from "express";

import {
  createUser,
  fetchInstructorWithCourses,
  fetchStudentWithEnrollments,
} from "../controllers/user.js";

const router = express.Router();

//create User
router.post("", createUser);

//get instructor with all courses
router.get("/instructor/:id", fetchInstructorWithCourses);

//get students with enrollments
router.get("/student/:id", fetchStudentWithEnrollments);

export default router;
