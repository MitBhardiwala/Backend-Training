import type { Request, Response } from "express";
import {
  checkEligibleforLeave,
  fetchRolePriority,
  getDatesBasedOnLeaveType,
  type ApiResponse,
} from "./utils.ts";
import { userApplyLeaveSchema } from "./validateSchema.ts";
import { joiGlobalErrorHandler } from "./joiErrorHandler.ts";
import prisma from "./db.ts";
import API_MESSAGES from "./constants.ts";

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

    const { startDate, endDate, leaveType, reason, requestToId } = req.body;

    //check if the requestToId exists or not, or
    const requestToUser = await prisma.user.findUnique({
      where: { id: requestToId },
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

    //check if user has already applied leave between given days
    const userExistingLeaves = await prisma.leaveRequest.findMany({
      where: { userId: req.user.id },
    });

    const { newStartDate, newEndDate } = getDatesBasedOnLeaveType(
      startDate,
      endDate,
      leaveType
    );

    // const isEligible = checkEligibleforLeave(
    //   startDate,
    //   endDate,
    //   userExistingLeaves
    // );

    // if (!isEligible) {
    //   return res.status(500).json({
    //     success: false,
    //     error: API_MESSAGES.USER.LEAVE_ERROR,
    //   });
    // }

    const leaveData = {
      startDate: newStartDate,
      endDate: newEndDate,
      requestToId: requestToId,
      reason: reason,
      userId: req.user.id,
      leaveType: leaveType,
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
    console.log(error);
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
