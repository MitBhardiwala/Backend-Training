import express from "express";
import {
  addStudent,
  fetchAllStudents,
  fetchStudent,
  updateStudent,
  deleteStudent,
  fetchAllCoursesEnrolledByStudent
} from "../controllers/studentControllers.js";

const router = express.Router();

router.post("", addStudent);
router.get("", fetchAllStudents);
router.get("/:id", fetchStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

//show all courses enrolled by student
router.get("/:id/enrollments",fetchAllCoursesEnrolledByStudent)
export default router;
