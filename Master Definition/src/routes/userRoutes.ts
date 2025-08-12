import express from "express";
import { loginUser, updateUser } from "../controllers/userControllers.ts";
import { authenticateToken } from "../middleware/authMiddleware.ts";
import { upload } from "../lib/multerConfig.ts";

const router = express.Router();

//user login ( student, faculty, hod and admin)

router.post("/login", loginUser);
router.put("", upload.single("image"), authenticateToken, updateUser);

export default router;
