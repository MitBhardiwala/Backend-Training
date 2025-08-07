import Joi from "joi";

const GENDER = ["Male", "Female"];

export const userRegistrationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string()
    .valid(...GENDER)
    .required(),
  image: Joi.any().required().label("Image File"),
  gr_number: Joi.string().optional(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  department: Joi.string().optional(),
  class: Joi.string().optional(),
  role_id: Joi.number().integer().min(1).required(),
}).options({ allowUnknown: false }); 

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).options({ allowUnknown: false }); 
