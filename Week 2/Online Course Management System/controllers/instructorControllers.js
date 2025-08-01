import { Course, Instructor } from "../models/index.js";
import API_MESSAGES from "../utils/constants.js";

export const addInstructor = async (req, res) => {
  try {
    const instructor = req.body;
    const createdInstructor = await Instructor.create(instructor);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.SUCCESS.INSTRUCTOR_ADDED,
      createdInstructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.INSTRUCTOR_NOT_ADDED,
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
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
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
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
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
          ? API_MESSAGES.SUCCESS.DATA_UPDATED
          : API_MESSAGES.SUCCESS.NO_DATA_FOUND +
            " or " +
            API_MESSAGES.SUCCESS.NO_CHANGES_MADE,
      updatedInstructorData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_UPDATED,
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
          ? API_MESSAGES.SUCCESS.DATA_DELETED
          : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      deletedInstructorData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_DELETED,
      error,
    });
  }
};

export const fetchAllCoursesCreatedByInstructor = async(req,res)=>{
  try {

    const {id} = req.params;
    const coursesData = await Instructor.findAll({
      include:[
        {
          model:Course,
          as:"Courses",
          attributes:{
            exclude:['categoryId','instructorId']
          }
        }
      ],
      where:{
        id:id
      },
      attributes:[['id','instructorId'],'name','email']
    })


    res.status(200).json({
      success:true,
      message:API_MESSAGES.SUCCESS.DATA_FETCHED,
      coursesData
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:API_MESSAGES.ERROR.DATA_NOT_FETCHED
    })
  }
}