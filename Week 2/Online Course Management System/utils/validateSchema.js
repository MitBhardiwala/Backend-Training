import z from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(1, { message: "Course Title cannot be empty" }),
  description: z.string().min(1, {
    message: "Course description cannot be empty",
  }),
  price: z.number().int().min(1, "Course price must be positive"),

  instructorId: z.number().int().min(1, "InstructorId must be positive"),
  categoryId: z.number().int().min(1, "CategoryId must be positive"),
});

export const InstructorSchema = z.object({
  name: z.string().min(1, { message: "Intsructor Name cannot be empty" }),
  email: z.email({ message: "Invalid email address" }),
});
export const StudentSchema = z.object({
  name: z.string().min(1, { message: "Student Name cannot be empty" }),
  email: z.email({ message: "Invalid email address" }),
});

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Category Name cannot be empty" }),
});

export const enrollmentSchema = z.object({
  studentId: z.number().int().min(1, "studentId must be positive"),
  courseId: z.number().int().min(1, "courseId must be positive"),
});
