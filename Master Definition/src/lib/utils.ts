import type { NextFunction, Request, Response } from "express";
import * as fs from "fs";
import prisma from "./db.ts";
import bcrypt from "bcryptjs";
import type { User, UserPayload } from "./types.ts";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import API_MESSAGES from "./constants.ts";

configDotenv();

const SECRET_KEY: any = process.env.JWT_SECRET;

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
  token?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

export const fetchRoleId = async (role: string) => {
  const roleDetails = await prisma.role.findUnique({ where: { name: role } });

  if (roleDetails === null) {
    throw new Error(API_MESSAGES.USER.INVALID_ROLE_ID);
  }

  return roleDetails.id;
};

export const fetchRolePriority = async (name?: string, id?: number) => {
  const whereOptions: any = {};

  name ? (whereOptions.name = name) : {};
  id ? (whereOptions.id = id) : {};

  const roleDetails = await prisma.role.findUnique({ where: whereOptions });

  if (roleDetails) {
    return roleDetails.priority;
  }

  return -1;
};

export const generateToken = (user: User) => {
  const JWT_TOKEN = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      department: user.department,
    },
    SECRET_KEY,
    {
      expiresIn: "4h",
    }
  );

  return JWT_TOKEN;
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export function toDataUri(imgPath: string) {
  const bitmap = fs.readFileSync(imgPath);
  const base64Image = Buffer.from(bitmap).toString("base64");
  const ext = imgPath.split(".").pop();
  const uri = `data:image/${ext};base64,${base64Image}`;

  return uri;
}

export const excludePassword = (user: User) => {
  const { password, ...newData } = user;
  return newData;
};

export const populateUserLeaveModel = async (
  userId: number,
  res: Response<ApiResponse>
) => {
  try {
    const academicYear = new Date().getFullYear();

    const userLeaveData = {
      userId: userId,
      totalLeave: 12,
      availableLeave: 12,
      usedLeave: 0,
      academicYear: academicYear.toString(),
      totalWorkingDays: 287,
      attendancePercentage: 100,
    };

    const userLeave = await prisma.userLeave.create({
      data: userLeaveData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.POPULATING_USER_LEAVE_ERROR,
    });
  }
};
