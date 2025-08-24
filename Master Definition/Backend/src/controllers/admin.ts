import type { Request, Response } from "express";
import { fetchRoleId, fetchRoleName, type ApiResponse } from "../lib/utils.ts";
import { registerUser } from "./student.ts";
import API_MESSAGES from "../lib/constants.ts";
import prisma from "../lib/db.ts";

export const fetchLeaveReport = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const leaveReport = await prisma.user.findMany({
      where: {
        role: {
          OR: [{ name: "Student" }, { name: "Faculty" }],
        },
      },
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
            status: true,
          },
        },
      },
    });

    const maxLeaves = await prisma.userLeave.aggregate({
      _max: {
        usedLeave: true,
      },
    });

    let userwithMaxLeave: any = [];
    if (maxLeaves._max.usedLeave !== null) {
      userwithMaxLeave = await prisma.userLeave.findMany({
        where: {
          usedLeave: maxLeaves._max.usedLeave as number,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              department: true,
              phone: true,
            },
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      data: { leaveDetails: leaveReport, userwithMaxLeave },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
export const fetchStats = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const studentRoleId = await fetchRoleId("Student");
    const facultyRoleId = await fetchRoleId("Faculty");
    const hodRoleId = await fetchRoleId("Hod");

    const totalUsers = await prisma.user.count();

    const totalStudents = await prisma.user.count({
      where: { roleId: studentRoleId },
    });
    const totalFaculty = await prisma.user.count({
      where: { roleId: facultyRoleId },
    });
    const totalHods = await prisma.user.count({ where: { roleId: hodRoleId } });

    const uniqueDepartments = await prisma.user.groupBy({
      by: ["department"],
      _count: {
        department: true,
      },
      where: {
        department: {
          not: null,
        },
      },
    });

    const data = {
      totalUsers: totalUsers,
      totalStudents: totalStudents,
      totalFaculty: totalFaculty,
      totalHods: totalHods,
      totalDepartments: uniqueDepartments.length,
    };

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
export const fetchAllHods = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const hodRoleId = await fetchRoleId("Hod");

    const hodList = await prisma.user.findMany({
      where: {
        roleId: hodRoleId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
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

export const fetchAllStudents = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const studentRoleId = await fetchRoleId("Student");

    const students = await prisma.user.findMany({
      where: { roleId: studentRoleId },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
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
      where: { roleId: facultyRoleId },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
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
