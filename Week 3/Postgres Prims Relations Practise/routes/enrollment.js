import express from "express";

import { createEnrollment, fetchEnrollments } from "../controllers/enrollment.js";

const router = express.Router();

router.post("", createEnrollment);

router.get("", fetchEnrollments);

export default router;
