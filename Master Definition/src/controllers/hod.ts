import type { NextFunction, Request, Response } from "express";
import {
  fetchRoleId,
  fetchRolePriority,
  toDataUri,
  updateUserLeaveModel,
  type ApiResponse,
} from "../lib/utils.ts";
import API_MESSAGES from "../lib/constants.ts";
import prisma from "../lib/db.ts";
import { registerUser } from "./student.ts";
import {
  userApproveLeaveSchema,
  userUpdateSchema,
} from "../lib/validateSchema.ts";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler.ts";

export const fetchAllStudents = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const studentRoleId = await fetchRoleId("Student");

    const students = await prisma.user.findMany({
      where: { roleId: studentRoleId, department: req.user.department },
      omit: {
        password: true,
        image: true,
        class: true,
        createdAt: true,
        updatedAt: true,
        roleId: true,
      },
    });

    res.status(200).json({
      success: true,
      message: students
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: students ? students : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};

export const fetchAllFaculties = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const facultyRoleId = await fetchRoleId("Faculty");

    const faculties = await prisma.user.findMany({
      where: { roleId: facultyRoleId, department: req.user.department },
      omit: {
        password: true,
        image: true,
        class: true,
        createdAt: true,
        updatedAt: true,
        roleId: true,
      },
    });

    res.status(200).json({
      success: true,
      message: faculties
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: faculties ? faculties : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};

export const fetchAllLeaveRequests = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        RequestedBy: {
          department: req.user.department,
        },
      },
      include: {
        RequestedBy: {
          select: {
            name: true,
            email: true,
            department: true,
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      message: leaveRequests
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: leaveRequests ? leaveRequests : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};

export const createStudent = (req: Request, res: Response<ApiResponse>) => {
  const hodDept = req.user.department;

  return registerUser(req, res, hodDept, "Student");
};
export const createFaculty = (req: Request, res: Response<ApiResponse>) => {
  const hodDept = req.user.department;

  return registerUser(req, res, hodDept, "Faculty");
};

export const updateLeaveStatus = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const { error } = userApproveLeaveSchema.validate({ ...req.body });
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    // check if hod ( or faculty ) and student are of same department
    const hodDept = req.user.department;
    const student = await prisma.user.findUnique({
      where: { id: req.body.userId },
    });

    if (hodDept !== student?.department) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.LEAVE_REQUEST.ERROR,
      });
    }

    //check if the approving user is eligible to approve the request of the user ( to avoid request like faculty cannot approve request of faculty)
    const userToBeUpdatedPriority = await fetchRolePriority(
      undefined,
      student?.roleId
    );
    const currentUserPriority = await fetchRolePriority(
      undefined,
      req.user.roleId
    );

    if (currentUserPriority <= userToBeUpdatedPriority) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.AUTH.UNAUTHORIZED,
      });
    }

    //approve leave request of the student or faculty
    const updatedUser = await prisma.leaveRequest.update({
      where: { id: req.body.leaveId, userId: req.body.userId },
      data: { status: req.body.updatedStatus },
    });

    if (req.body.updatedStatus === "approved") {
      await updateUserLeaveModel(req.body.userId);
    }

    return res.status(200).json({
      success: true,
      message: updatedUser
        ? API_MESSAGES.LEAVE_REQUEST.SUCCESS
        : API_MESSAGES.LEAVE_REQUEST.NOT_FOUND,
      data: updatedUser ? updatedUser : [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: API_MESSAGES.LEAVE_REQUEST.ERROR,
    });
  }
};
