import type { Request, Response } from "express";
import { fetchRoleId, type ApiResponse } from "../lib/utils.ts";
import API_MESSAGES from "../lib/constants.ts";
import prisma from "../lib/db.ts";
import { dmmfToRuntimeDataModel } from "../generated/prisma/runtime/library.js";

export const fetchAllStudents = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const studentRoleId = await fetchRoleId("Student");

    if (!req.user.department) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.HOD.DEPARTMENT_NOT_ASSIGNED,
      });
    }

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

export const fetchAllLeaves = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const studentRoleId = await fetchRoleId("Student");
    const facultyRoleId = await fetchRoleId("Faculty");

    if (!req.user.department) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.HOD.DEPARTMENT_NOT_ASSIGNED,
      });
    }

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
