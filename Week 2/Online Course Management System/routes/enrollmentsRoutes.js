import express from "express";
import {
  addEnrollment,
  fetchAllEnrollments,
  deleteEnrollment,
} from "../controllers/enrollmentControllers.js";

const router = express.Router();

router.post("", addEnrollment);
router.get("", fetchAllEnrollments);
router.delete("/:id", deleteEnrollment);

export default router;
