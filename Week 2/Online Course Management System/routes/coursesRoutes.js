import express from "express";
import {
  addCourse,
  fetchAllCourses,
  updateCourse,
  fetchCourse,
  deleteCourse,
} from "../controllers/coursesControllers.js";

const router = express.Router();

router.get("", fetchAllCourses);
router.get("/:id", fetchCourse);
router.post("", addCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
