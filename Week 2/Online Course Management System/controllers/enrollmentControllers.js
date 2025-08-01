import { Enrollment } from "../models/index.js";
import API_MESSAGES from "../utils/constants.js";

export const addEnrollment = async (req, res) => {
  try {
    const enrollmentData = req.body;
    const createdEnrollment = await Enrollment.create(enrollmentData);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ENROLLMENT_ADDED,
      createdEnrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.ENROLLMENT_NOT_ADDED,
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
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
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
          ? API_MESSAGES.SUCCESS.DATA_DELETED
          : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      deletedEnrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_DELETED,
      error,
    });
  }
};