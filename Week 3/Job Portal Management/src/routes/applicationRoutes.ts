import express from "express";
import {
  applyForJob,
  fetchApplicationsForUser,
  fetchApplicationsForRecruiter
} from "../controllers/applicationControllers.ts";
import {
  authenticateApplicant,
  authenticateRecruiter,
  authenticateToken,
} from "../middleware/authMiddleware.ts";

const router = express.Router();

//apply to application (allowed only by applicant)
router.post("", authenticateToken, authenticateApplicant, applyForJob);

//get application for a particular user
router.get("/user", authenticateToken, fetchApplicationsForUser);

//get applications for jobs that recruiter created
router.get("/jobs",authenticateToken, authenticateRecruiter,fetchApplicationsForRecruiter)
export default router;
