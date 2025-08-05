import express from "express";
import API_MESSAGES from "../lib/constants.js";
import prisma from "../lib/db.js";

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const userData = req.body;

    const user = await prisma.user.create({
      data: userData,
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.DATA.ADD_SUCCESS,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.ADD_ERROR,
      error,
    });
  }
});
//get instructor with all courses
router.get("/instructor/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await prisma.user.findMany({
      where: {
        role: "INSTRUCTOR",
        id: Number(id),
      },
      include: {
        Course: true,
      },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      error,
    });
  }
});

//get students with enrollments
router.get("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await prisma.user.findMany({
      where: {
        role: "STUDENT",
        id:Number(id)
      },
      include: {
        Enrollments: {
            include:{
                course:true
            }
        }
      },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      instructor,
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
