import API_MESSAGES from "../lib/constants.js";
import prisma from "../lib/db.js";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler.js";
import { courseSchema } from "../lib/validations.js";

export const createCourse = async (req, res) => {
  try {
    const { error } = courseSchema.validate(req.body);
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }
    const courseData = req.body;

    const course = await prisma.course.create({
      data: courseData,
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.DATA.ADD_SUCCESS,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.ADD_ERROR,
      error,
    });
  }
};

export const fetchCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findMany({
      where: {
        id: Number(id),
      },
      include: {
        instructor: true,
        category: true,
      },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      error,
    });
  }
};
