import express from "express";
import auth from "./auth.ts";
import user from "./user.ts";
import job from "./job.ts";
import company from "./company.ts";
import application from "./application.ts";

const router = express.Router();

//auth routes
router.use("/auth", auth);

//user routes
router.use("/user", user);

//company routes
router.use("/company", company);

//job routes
router.use("/job", job);

//application ROutes
router.use("/application", application);

export default router;
