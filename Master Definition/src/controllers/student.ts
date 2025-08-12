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

export const createLeaveApplication = async (
  req: Request,
  res: Response<ApiResponse>,
  requestedBy: string = "Student"
) => {
  try {
    //user request validation
    const { error } = userApplyLeaveSchema.validate({ ...req.body });
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    //check if the requestToId exists or not, or
    const requestToUser = await prisma.user.findUnique({
      where: { id: req.body.requestToId },
    });

    if (!requestToUser) {
      return res.status(500).json({
        success: false,
        error: API_MESSAGES.USER.LEAVE_ERROR,
      });
    }

    //check if user is eligible to take leave or not
    const userLeaveDetails = await prisma.userLeave.findUnique({
      where: { userId: req.user.id },
    });
    if (!userLeaveDetails || userLeaveDetails.availableLeave === 0) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.USER.LEAVE_NOT_ALLOWED,
      });
    }

    // check if requested hod  has been assigned department or not - or user is applying to the hod or faculty of same department only
    if (
      !requestToUser.department ||
      requestToUser.department != req.user.department
    ) {
      return res.status(500).json({
        success: false,
        error:
          API_MESSAGES.USER.DEPARTMENT_NOT_ASSIGNED +
          " or " +
          API_MESSAGES.USER.DEPT_CONFLICT_ERROR,
      });
    }

    //RequestToUser should have priority greater requestByUser priority
    const requestedByPriority = await fetchRolePriority(requestedBy, undefined);
    const requestToUserPrioriy = await fetchRolePriority(
      undefined,
      requestToUser.roleId
    );

    if (requestToUserPrioriy <= requestedByPriority) {
      return res.status(500).json({
        success: false,
        error: API_MESSAGES.USER.LEAVE_ERROR,
      });
    }

    const leaveData = {
      ...req.body,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      userId: req.user.id,
    };

    const newLeave = await prisma.leaveRequest.create({
      data: leaveData,
    });

   

    res.status(201).json({
      success: true,
      message: API_MESSAGES.USER.LEAVE_SUCCESS,
      data: newLeave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.USER.LEAVE_ERROR,
    });
  }
};

export const fetchLeaveDetails = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const leaveDetails = await prisma.leaveRequest.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        reason: true,
        status: true,
      },
    });
    res.status(200).json({
      success: true,
      message: leaveDetails
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: leaveDetails ? leaveDetails : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};

export const fetchLeaveBalance = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const leaveBalance = await prisma.userLeave.findFirst({
      where: { userId: req.user.id },
      //  include:{
      //     user:true
      //  }
      omit: {
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: leaveBalance
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: leaveBalance ? leaveBalance : [],
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
