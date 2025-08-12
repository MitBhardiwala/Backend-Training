import express from "express";
import user from "./user.js";
import category from "./category.js";
import course from "./course.js";
import enrollment from "./enrollment.js";

const router = express.Router();

//user routes
router.use("/user", user);

//category routes
router.use("/category", category);

//course routes
router.use("/course", course);

//enrollments routes
router.use("/enrollment", enrollment);

export default router;
