import Category from "./Category.js";
import Enrollment from "./Enrollment.js";
import Course from "./Course.js";
import Student from "./Student.js";
import Instructor from "./Instructor.js";
import sequelize from "../config/database.js";

//relation between course and category
// course will contain foreign key categoryId
Course.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "Category",
});

Category.hasMany(Course, {
  foreignKey: "categoryId",
  as: "Courses",
});

//relation between courses and instructor
//course will contain foreign key instructorId
Course.belongsTo(Instructor, {
  foreignKey: "instructorId",
  as: "Instructor",
});

Instructor.hasMany(Course, {
  foreignKey: "instructorId",
  as: "Courses",
});

//relation between Courses and Students
// Enrollment will contain foregin Key studentId

Student.hasMany(Enrollment, {
  foreignKey: "studentId",
  as: "Enrollments",
  onDelete: "CASCADE",
  hooks: true,
});

Enrollment.belongsTo(Student, {
  foreignKey: {
    name: "studentId",
    allowNull: false,
  },
  as: "Student",
});

//relation between Courses and Enrollments
//Enrollment with contain foreign key courseId
Course.hasMany(Enrollment, {
  foreignKey: "courseId",
  as: "CourseEnrollments",
  onDelete: "CASCADE",
  hooks: true,
});

Enrollment.belongsTo(Course, {
  foreignKey: {
    name: "courseId",
    allowNull: false,
  },
  as: "Course",
});

export { Course, Instructor, Student, Category, Enrollment };
