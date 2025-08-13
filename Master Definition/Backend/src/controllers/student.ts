import type { Request, Response } from "express";
import {
  excludePassword,
  fetchRoleId,
  fetchRolePriority,
  generateToken,
  hashPassword,
  populateUserLeaveModel,
  toDataUri,
  type ApiResponse,
} from "../lib/utils.ts";
import API_MESSAGES from "../lib/constants.ts";

import {
  userApplyLeaveSchema,
  userRegistrationSchema,
  userUpdateSchema,
} from "../lib/validateSchema.ts";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler.ts";
import prisma from "../lib/db.ts";
import type { User } from "../lib/types.ts";

export const registerUser = async (
  req: Request,
  res: Response<ApiResponse>,
  department: string | null = null,
  role: string = "Student"
) => {
  try {
    //user request validation
    const { error } = userRegistrationSchema.validate({ ...req.body });
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    //check if user has uploaded image or not
    const image = req.file;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.VALIDATION.IMAGE_NOT_FOUND,
      });
    }
    //creating the Student Object
    const studentRoleId = await fetchRoleId(role);
    const hashedPassword = await hashPassword(req.body.password);
    const encodedImage = toDataUri(req.file.path);

    const newUserData: User = {
      ...req.body,
      password: hashedPassword,
      roleId: studentRoleId,
      image: encodedImage,
    };

    department ? (newUserData.department = department) : {};

    //check if user exists or not

    const existingUser = await prisma.user.findUnique({
      where: { email: newUserData.email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: API_MESSAGES.USER.ALREADY_EXISTS,
      });
    }
    const token = generateToken(newUserData);

    const newUser = await prisma.user.create({
      data: newUserData,
    });
    await populateUserLeaveModel(newUser.id, res);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.USER.REGISTER_SUCCESS,
      data: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.USER.LOGIN_ERROR,
    });
  }
};

export const fetchStudent = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const student = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    const responseData = student ? excludePassword(student) : [];
    res.status(200).json({
      success: true,
      message: student
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};

export const updateStudent = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    //user request validation
    const { error } = userUpdateSchema.validate({ ...req.body });
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    const dataToBeUpdated = { ...req.body };

    req.file ? (dataToBeUpdated.image = toDataUri(req.file.path)) : {};

    const updatedData = await prisma.user.updateMany({
      where: { id: req.user.id },
      data: dataToBeUpdated,
    });

    res.status(200).json({
      success: true,
      message: updatedData.count
        ? API_MESSAGES.DATA.UPDATE_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: updatedData.count ? updatedData : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.UPDATE_ERROR,
    });
  }
};

