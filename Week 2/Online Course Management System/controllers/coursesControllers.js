import API_MESSAGES from "../utils/constants.js";
import { Category, Course, Instructor } from "../models/index.js";
import { Op } from "sequelize";
import z, { success } from "zod";
import { createCourseSchema } from "../utils/validateSchema.js";
import { checkIsValidCourse } from "../utils/helperFunctions.js";

export const addCourse = async (req, res) => {
  try {
    const course = req.body;

    createCourseSchema.parse(course);

    //check it course is valid
    const isValidCourse = await checkIsValidCourse(course);

    if (!isValidCourse) {
      return res.status(500).json({
        success: false,
        message: API_MESSAGES.COURSE.ERROR,
      });
    }

    const createdCourse = await Course.create(course);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.COURSE.SUCCESS,
      createdCourse,
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
      message: API_MESSAGES.COURSE.ERROR,
    });
  }
};
export const fetchAllCourses = async (req, res) => {
  try {
    const {
      search = "",
      limit,
      offset,
      sortBy = "id",
      order = "ASC",
      minPrice = 0,
      maxPrice = Number.MAX_SAFE_INTEGER,
    } = req.query;

    const courses = await Course.findAll({
      where: {
        title: {
          [Op.regexp]: `.*${search}.*`,
        },
        price: {
          [Op.between]: [Number(minPrice), Number(maxPrice)],
        },
      },
      limit: limit ? Number(limit) : null,
      offset: offset ? Number(offset) : null,
      order: [[sortBy, order]],
    });

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
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      error,
    });
  }
};
export const fetchCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({
      attributes: {
        exclude: ["instructorId"],
      },
      where: {
        id: id,
      },
      include: [
        {
          model: Instructor,
          as: "Instructor",
          attributes: ["id", "name"],
        },
        {
          model: Category,
          as: "Category",
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
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCourse = await Course.update(
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
        updatedCourse[0] > 0
          ? API_MESSAGES.DATA.UPDATE_SUCCESS
          : API_MESSAGES.DATA.NOT_FOUND +
            " or " +
            API_MESSAGES.DATA.NO_MODIFICATIONS,
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
      message: API_MESSAGES.DATA.UPDATE_ERROR,
      error,
    });
  }
};
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message:
        deletedCourse > 0
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
