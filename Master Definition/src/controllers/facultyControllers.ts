import type { Request, Response } from "express";
import type { ApiResponse } from "../lib/utils.ts";
import prisma from "../lib/db.ts";
import API_MESSAGES from "../lib/constants.ts";

export const fetchAllLeaves = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
  

     const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        requestToId: req.user.id,
      },
      include: {
        RequestedBy: {
          select: {
            name: true,
            email: true,
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

export const createFacultyLeaveApplication = ()=>{

}