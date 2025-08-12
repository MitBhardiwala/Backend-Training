import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

export const categorySchema = Joi.object({
  name: Joi.string().required(),
});

export const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().integer().min(1).required(),
  categoryId: Joi.number().integer().min(1).required(),
  instructorId: Joi.number().integer().min(1).required(),
});

export const enrollmentSchema = Joi.object({
  studentId: Joi.number().integer().min(1).required(),
  courseId: Joi.number().integer().min(1).required(),
});
