import express from "express";
import API_MESSAGES from "../lib/constants.js";
import prisma from "../lib/db.js";

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const categoryData = req.body;

    const category = await prisma.category.create({
      data: categoryData,
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.DATA.ADD_SUCCESS,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.ADD_ERROR,
      error,
    });
  }
});


export default router;
