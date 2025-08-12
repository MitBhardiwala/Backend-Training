import API_MESSAGES from "../lib/constants.js";
import prisma from "../lib/db.js";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler.js";
import { enrollmentSchema } from "../lib/validations.js";

export const createEnrollment = async (req, res) => {
  try {
    const { error } = enrollmentSchema.validate(req.body);
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }
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
};

export const fetchEnrollments = async (req, res) => {
  try {
    const enrollment = await prisma.enrollments.findMany({
      include: {
        student: true,
        course: true,
      },
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
};
