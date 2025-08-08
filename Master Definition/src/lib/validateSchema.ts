import coreJoi from "joi";
import joiDate from "@joi/date";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

const GENDER = ["male", "female"];
const LEAVE_TYPE = ["firstHalf", "secondHalf", "fullDay"]

export const userRegistrationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string()
    .valid(...GENDER)
    .required(),
  grNumber: Joi.string().optional(),
  phone: Joi.number().required(),
  address: Joi.string().required(),
  department: Joi.string().optional(),
  class: Joi.string().optional(),
}).options({ allowUnknown: false });

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).options({ allowUnknown: false });


export const userUpdateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  gender: Joi.string()
    .valid(...GENDER)
    .optional(),
  grNumber: Joi.string().optional(),
  phone: Joi.number().optional(),
  address: Joi.string().optional(),
  department: Joi.string().optional(),
  class: Joi.string().optional(),
}).options({ allowUnknown: false });

export const userApplyLeaveSchema = Joi.object({
  startDate: Joi.date().format('YYYY-MM-DD').required(),
  endDate: Joi.date().format('YYYY-MM-DD').greater(Joi.ref('startDate')).required(),
  leaveType: Joi.string()
    .valid(...LEAVE_TYPE)
    .required(),
  reason: Joi.string().min(5).max(255).required(),
  requestToId: Joi.number().min(1).required()
});