import express from "express";
import { registerUser, loginUser } from "../controllers/userControllers.ts";

const router = express.Router();

//register
router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;
