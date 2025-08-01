import express from "express";
import {
  addCategory,
  fetchAllCategories,
  fetchCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.post("", addCategory);
router.get("", fetchAllCategories);
router.get("/:id", fetchCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
