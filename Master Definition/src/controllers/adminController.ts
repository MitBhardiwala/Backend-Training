import type { Request, Response } from "express";
import type { ApiResponse } from "../lib/utils.ts";
import { registerUser } from "./studentControllers.ts";
import API_MESSAGES from "../lib/constants.ts";
import prisma from "../lib/db.ts";

export const createStudent = (req: Request, res: Response<ApiResponse>) => {
  return registerUser(req, res, null, "Student");
};
export const createHod = (req: Request, res: Response<ApiResponse>) => {
  const hodDept = req.user.department;

  return registerUser(req, res, null, "Hod");
};
export const createFaculty = (req: Request, res: Response<ApiResponse>) => {
  const hodDept = req.user.department;

  return registerUser(req, res, null, "Faculty");
};

export const fetchLeaveReport = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const leaveReport = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        phone: true,
        department: true,
        RequestedLeaves: {
          select: {
            startDate: true,
            endDate: true,
            leaveType: true,
            reason: true,
          },
        },
      },
    });

    const maxLeaves = await prisma.userLeave.aggregate({
      _max: {
        usedLeave: true,
      },
    });

    const userwithMaxLeave = await prisma.userLeave.findMany({
      where: {
        usedLeave: maxLeaves._max.usedLeave,
      },
      include:{
        user:{
          select:{
            name:true,
            email:true,
            department:true,
            phone:true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      data: userwithMaxLeave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
