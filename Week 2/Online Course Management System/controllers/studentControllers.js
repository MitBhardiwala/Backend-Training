import { Op } from "sequelize";
import { Course, Enrollment, Student } from "../models/index.js";
import API_MESSAGES from "../utils/constants.js";
import { raw } from "mysql2";

export const addStudent = async (req, res) => {
  try {
    const student = req.body;
    const createdStudent = await Student.create(student);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.SUCCESS.STUDENT_ADDED,
      createdStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.STUDENT_NOT_ADDED,
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
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
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
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
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
          ? API_MESSAGES.SUCCESS.DATA_UPDATED
          : API_MESSAGES.SUCCESS.NO_DATA_FOUND +
            " or " +
            API_MESSAGES.SUCCESS.NO_CHANGES_MADE,
      updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_UPDATED,
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
          ? API_MESSAGES.SUCCESS.DATA_DELETED
          : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_DELETED,
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
      message: coursesData[0].Enrollments.length ? API_MESSAGES.SUCCESS.DATA_FETCHED :API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      coursesData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
    });
  }
};
