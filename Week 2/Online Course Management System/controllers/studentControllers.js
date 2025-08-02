import { Op } from "sequelize";
import { Course, Enrollment, Student } from "../models/index.js";
import API_MESSAGES from "../utils/constants.js";
import { raw } from "mysql2";
import { StudentSchema } from "../utils/validateSchema.js";
import z from "zod";
import { checkIfEmailExists } from "../utils/helperFunctions.js";

export const addStudent = async (req, res) => {
  try {
    const student = req.body;

    StudentSchema.parse(student);

    const ifEmailExists = await checkIfEmailExists(student.email);

    if (ifEmailExists) {
      return res.status(500).json({
        success: false,
        message: API_MESSAGES.DATA.EMAIL_ALREADY_EXISTS,
      });
    }
    const createdStudent = await Student.create(student);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.STUDENT.SUCCESS,
      createdStudent,
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
      message: API_MESSAGES.STUDENT.ERROR,
      error,
    });
  }
};

export const fetchAllStudents = async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      limit,
      offset,
      sortBy = "id",
      order = "ASC",
    } = req.query;

    const students = await Student.findAll({
      where: {
        name: {
          [Op.regexp]: `.*${name}.*`,
        },
        email: {
          [Op.regexp]: `.*${email}.*`,
        },
      },
      limit: limit ? Number(limit) : null,
      offset: offset ? Number(offset) : null,
      order: [[sortBy, order]],
    });

    res.status(200).json({
      success: true,
      message: students.length
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      error,
    });
  }
};

export const fetchStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findOne({
      where: {
        id: id,
      },
      include: {
        model: Enrollment,
        as: "Enrollments",
      },
    });

    res.status(200).json({
      success: true,
      message: student
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      error,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedStudent = await Student.update(
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
        updatedStudent[0] > 0
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

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message:
        deletedStudent > 0
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

export const fetchAllCoursesEnrolledByStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const coursesData = await Student.findAll({
      include: [
        {
          model: Enrollment,
          as: "Enrollments",
          include: [
            {
              model: Course,
              as: "Course",
              attributes: {
                exclude: ["id", "categoryId", "instructorId"],
              },
            },
          ],
          attributes: ["courseId"],
        },
      ],
      where: {
        id: id,
      },
    });

    res.json({
      success: true,
      message: coursesData[0].Enrollments.length
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      coursesData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
