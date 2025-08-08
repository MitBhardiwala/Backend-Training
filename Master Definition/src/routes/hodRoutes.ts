import express from "express";
import { fetchAllStudents } from "../controllers/hodControllers.ts";
import {
  authenticateHod,
  authenticateToken,
  fetchAllLeaves
} from "../middleware/authMiddleware.ts";

const router = express.Router();

//get all students ( hod will be able to view the student details only of its own department)
router.get(
  "/allStudents",
  authenticateToken,
  authenticateHod,
  fetchAllStudents
);

//same as above for faculties


router.get("/leaveRequest",authenticateToken,authenticateHod,fetchAllLeaves)

export default router;
