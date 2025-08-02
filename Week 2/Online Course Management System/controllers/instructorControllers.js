import z from "zod";
import { Course, Instructor } from "../models/index.js";
import API_MESSAGES from "../utils/constants.js";
import { InstructorSchema } from "../utils/validateSchema.js";
import { checkIfEmailExists } from "../utils/helperFunctions.js";

export const addInstructor = async (req, res) => {
  try {
    const instructor = req.body;

    InstructorSchema.parse(instructor);

    const ifEmailExists = await checkIfEmailExists(instructor.email);

    if (ifEmailExists) {
      return res.status(500).json({
        success: false,
        message: API_MESSAGES.DATA.EMAIL_ALREADY_EXISTS,
      });
    }

    const createdInstructor = await Instructor.create(instructor);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.INSTRUCTOR.SUCCESS,
      createdInstructor,
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
      message: API_MESSAGES.INSTRUCTOR.ERROR,
      error,
    });
  }
};
export const fetchInstructorDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Instructor.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Course,
          as: "Courses",
          attributes: ["id", "title", "description"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: course
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
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

export const fetchAllInstructors = async (req, res) => {
  try {
    const courses = await Instructor.findAll({});

    res.status(200).json({
      success: true,
      message: courses.length
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      error,
    });
  }
};

export const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedInstructorData = await Instructor.update(
      req.body,

      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({
      success: true,
      message:
        updatedInstructorData[0] > 0
          ? API_MESSAGES.DATA.UPDATE_SUCCESS
          : API_MESSAGES.DATA.NOT_FOUND +
            " or " +
            API_MESSAGES.DATA.NO_MODIFICATIONS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.UPDATE_ERROR,
      error,
    });
  }
};

export const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInstructorData = await Instructor.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message:
        deletedInstructorData > 0
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

export const fetchAllCoursesCreatedByInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const coursesData = await Instructor.findAll({
      include: [
        {
          model: Course,
          as: "Courses",
          attributes: {
            exclude: ["categoryId", "instructorId"],
          },
        },
      ],
      where: {
        id: id,
      },
      attributes: [["id", "instructorId"], "name", "email"],
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      coursesData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
