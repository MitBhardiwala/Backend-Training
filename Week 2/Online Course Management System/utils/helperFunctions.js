import { Category, Course, Instructor, Student } from "../models/index.js";

export const isValidCourseId = async (id) => {
  const course = await Course.findOne({
    where: { id: id },
  });

  return course ? true : false;
};

export const isValidStudentId = async (id) => {
  const student = await Student.findOne({
    where: { id: id },
  });

  return student ? true : false;
};
export const isValidCategoryId = async (id) => {
  const category = await Category.findOne({
    where: { id: id },
  });

  return category ? true : false;
};

export const isValidInstructorId = async (id) => {
  const instructor = await Instructor.findOne({
    where: { id: id },
  });

  return instructor ? true : false;
};

export const checkIsValidCourse = async (course) => {
  //check if course already exists
  const existingCourse = await Course.findOne({
    where: { title: course.title },
  });

  if (existingCourse) return false;

  //check if categoryId exists
  const existingCategory = await isValidCategoryId(course.categoryId);

  if (!existingCategory) return false;

  //check if instructorId exists
  const existingInstrutor = await isValidInstructorId(course.instructorId);

  if (!existingInstrutor) return false;

  return true;
};

export const checkIfEmailExists = async (email) => {
  const student = await Student.findOne({ where: { email: email } });
  const instructor = await Instructor.findOne({ where: { email: email } });

  return student || instructor ? true : false;
};

export const isValidEnrollment = async (enrollment) => {
  const course = await isValidCourseId(enrollment.courseId);
  const student = await isValidStudentId(enrollment.studentId);

  return course && student ? true : false;
};
