import type { NextFunction, Request, Response } from "express";
import API_MESSAGES from "../lib/constants.ts";
import jwt, { type JwtPayload } from "jsonwebtoken";

import prisma from "../lib/db.ts";
import type { UserPayload } from "../lib/types.ts";
import { fetchRoleId, type ApiResponse } from "../lib/utils.ts";

const JWT_SECRET_KEY: any = process.env.JWT_SECRET;

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(500).json({
        success: false,
        message: API_MESSAGES.AUTH.INVALID_TOKEN,
      });
    }

    const userPayload = jwt.verify(token, JWT_SECRET_KEY) as UserPayload;

    //check if user exists in database or not
    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
    });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: API_MESSAGES.AUTH.INVALID_TOKEN,
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      department: user.department || null,
    };

    console.log(req.user)

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.AUTH.INVALID_TOKEN,
    });
  }
};

export const authenticateHod = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const hodRoleId = await fetchRoleId("Hod");

  if (req.user.roleId !== hodRoleId) {
    return res.status(500).json({
      success: false,
      message: API_MESSAGES.AUTH.UNAUTHORIZED,
    });
  }
  next();
};

export const authenticateFaculty = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const hodRoleId = await fetchRoleId("Faculty");

  if (req.user.roleId !== hodRoleId) {
    return res.status(500).json({
      success: false,
      message: API_MESSAGES.AUTH.UNAUTHORIZED,
    });
  }
  next();
};
export const authenticateAdmin = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const hodRoleId = await fetchRoleId("Admin");

  if (req.user.roleId !== hodRoleId) {
    return res.status(500).json({
      success: false,
      message: API_MESSAGES.AUTH.UNAUTHORIZED,
    });
  }
  next();
};

export const checkDeptAssigned = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  if (!req.user.department) {
    console.log("hello");
    return res.status(400).json({
      success: false,
      error: API_MESSAGES.USER.DEPARTMENT_NOT_ASSIGNED,
    });
  }

  next();
};
