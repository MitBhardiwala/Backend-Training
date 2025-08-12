import express from "express";
import { createCourse, fetchCourse } from "../controllers/course.js";

const router = express.Router();

router.post("", createCourse);

router.get("/:id", fetchCourse);

export default router;
