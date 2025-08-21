import type { Request, Response } from "express";
import {
  fetchRoleId,
  fetchRolePriority,
  type ApiResponse,
} from "../lib/utils.ts";
import prisma from "../lib/db.ts";
import API_MESSAGES from "../lib/constants.ts";
import { registerUser } from "./student.ts";
import type { Status } from "../generated/prisma/index.js";

export const fetchAllLeaves = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const { status } = req.query;

    const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        status: status,
        requestToId: req.user.id,
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        leaveType: true,
        reason: true,
        status: true,

        RequestedBy: {
          select: {
            id: true,
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
export const fetchHodList = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const hodRoleId = await fetchRoleId("Hod");
    const hodList = await prisma.user.findMany({
      where: {
        roleId: hodRoleId,
        department: req.user.department,
      },
      select: {
        name: true,
        id: true,
      },
    });
    res.status(200).json({
      success: true,
      message: hodList
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: hodList ? hodList : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
export const createStudent = (req: Request, res: Response<ApiResponse>) => {
  const facultyDept = req.user.department;

  return registerUser(req, res, facultyDept, "Student");
};
