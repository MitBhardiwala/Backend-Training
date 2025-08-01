import z from "zod";

export const createCourseSchema = z.object({
  title: z
    .string({
      required_error: "Course Title is required",
    })
    .min(1, { message: "Course Title cannot be empty" }),
  description: z
    .string({
      required_error: "Course description is required",
    })
    .min(1, { message: "Course description cannot be empty" }),
  instructorId: z.number().int().min(1,'InstructorId cannot ne negative'),
  categoryId:  z.number().int().min(1,'Category cannot ne negative'),
});
