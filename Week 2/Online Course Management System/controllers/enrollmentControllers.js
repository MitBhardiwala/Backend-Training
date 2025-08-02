import z from "zod";
import { Enrollment } from "../models/index.js";
import API_MESSAGES from "../utils/constants.js";
import { enrollmentSchema } from "../utils/validateSchema.js";
import { isValidEnrollment } from "../utils/helperFunctions.js";

export const addEnrollment = async (req, res) => {
  try {
    const enrollmentData = req.body;

    enrollmentSchema.parse(enrollmentData);

    const validEnrollment = await isValidEnrollment(enrollmentData);

    if (!validEnrollment) {
      return res.status(400).json({
        success: false,
        message: API_MESSAGES.ENROLLMENT.ERROR,
      });
    }

    const createdEnrollment = await Enrollment.create(enrollmentData);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.ENROLLMENT.SUCCESS,
      createdEnrollment,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues,
        error: API_MESSAGES.VALIDATION.ZOD_ERROR,
      });
    }
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ENROLLMENT.ERROR,
      error,
    });
  }
};

export const fetchAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({});

    res.status(200).json({
      success: true,
      message: enrollments.length
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      error,
    });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEnrollment = await Enrollment.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message:
        deletedEnrollment > 0
          ? API_MESSAGES.DATA.DELETE_SUCCESS
          : API_MESSAGES.DATA.NOT_FOUND,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.DELETE_ERROR,
      error,
    });
  }
};
