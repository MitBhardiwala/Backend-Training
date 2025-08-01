import express from "express";
import {
  addInstructor,
  fetchInstructorDetails,
  fetchAllInstructors,
  updateInstructor,
  deleteInstructor,
  fetchAllCoursesCreatedByInstructor,
} from "../controllers/instructorControllers.js";

const router = express.Router();

router.get("/", fetchAllInstructors);
router.get("/:id", fetchInstructorDetails);
router.post("", addInstructor);
router.put("/:id", updateInstructor);
router.delete("/:id", deleteInstructor);

//fetch all the courses created by instructor
router.get("/:id/courses", fetchAllCoursesCreatedByInstructor);

export default router;
