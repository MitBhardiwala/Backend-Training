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
