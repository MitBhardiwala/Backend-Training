import express from "express";
import API_MESSAGES from "../lib/constants.js";
import prisma from "../lib/db.js";

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const enrollmentData = req.body;

    const enrollment = await prisma.enrollments.create({
      data: enrollmentData,
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.DATA.ADD_SUCCESS,
      enrollment,
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.ADD_ERROR,
      error,
    });
  }
});

router.get("", async (req, res) => {
  try {
    const enrollment = await prisma.enrollments.findMany({
        include:{
            student:true,
            course:true
        }
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      error,
    });
  }
});

export default router;
