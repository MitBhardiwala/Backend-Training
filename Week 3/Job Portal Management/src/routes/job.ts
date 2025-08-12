import express from "express";
import {
  createJob,
  fetchJobsList,
  fetchJobById,
  deleteJob,
} from "../controllers/job.ts";
import {
  authenticateRecruiter,
  authenticateToken,
} from "../middleware/authMiddleware.ts";

const router = express.Router();

//create job module
router.post("", authenticateToken, authenticateRecruiter, createJob);
router.get("", authenticateToken, fetchJobsList);
router.get("/:id", authenticateToken, fetchJobById);
router.delete("/:id", authenticateToken, authenticateRecruiter, deleteJob);

export default router;
