import express from "express";
import {
  createCompany,
  fetchCompany,
  updateCompany,
} from "../controllers/company.ts";
import {
  authenticateRecruiter,
  authenticateToken,
} from "../middleware/authMiddleware.ts";

const router = express.Router();

//create compnay route
router.post("", authenticateToken, authenticateRecruiter, createCompany);
router.get("/:id", fetchCompany);
router.put("/:id", authenticateToken, authenticateRecruiter, updateCompany);

export default router;
