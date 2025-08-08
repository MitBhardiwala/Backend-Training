import express from "express";
import { loginUser } from "../controllers/userControllers.ts";

const router = express.Router();

//user login ( student, faculty, hod and admin)

router.post("/login", loginUser);

export default router;
