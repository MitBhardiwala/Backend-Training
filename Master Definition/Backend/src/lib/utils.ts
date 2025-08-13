import {
  response,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import * as fs from "fs";
import prisma from "./db.ts";
import bcrypt from "bcryptjs";
import type { Leave, User, UserPayload } from "./types.ts";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { userApplyLeaveSchema } from "./validateSchema.ts";

import API_MESSAGES from "./constants.ts";
import { transporter } from "./smtp.config.ts";

const SECRET_KEY: any = process.env.JWT_SECRET;
const SMTP_EMAIL = process.env.SMTP_USER_MAIL;

declare global {
  namespace Express {
    interface Request {
      user: GlobalUser;
    }
  }
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
  token?: string;
}

interface GlobalUser {
  id: number;
  email: string;
  roleId: number;
  department: string | null;
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

export const updateUserLeaveModel = async (userId: number) => {
  try {
    const previousLeaveData = await prisma.userLeave.findUnique({
      where: { userId: userId },
    });

    if (!previousLeaveData) {
      return response.status(500).json({
        success: false,
        error: API_MESSAGES.LEAVE_REQUEST.ERROR,
      });
    }

    const leaveData = {
      ...previousLeaveData,
      availableLeave: previousLeaveData.availableLeave - 1,
      usedLeave: previousLeaveData.usedLeave + 1,
      attendancePercentage:
        ((previousLeaveData.totalWorkingDays - previousLeaveData.usedLeave) /
          previousLeaveData.totalWorkingDays) *
        100,
    };

    const updatedLeave = await prisma.userLeave.update({
      where: { userId: userId },
      data: leaveData,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.POPULATING_USER_LEAVE_ERROR,
    });
  }
};

export const sendOtpEmail = async (email: string) => {
  try {
    const verificationOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await transporter.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Your OTP for Verification",
      html: `<p>Your One-Time Password (OTP) is: <strong>${verificationOtp}</strong></p><p>This OTP is valid for 10 minutes.</p>`,
    });

    await prisma.user.update({
      where: { email },
      data: { verificationOtp, verificationOtpExpires },
    });

    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export const checkEligibleforLeave = (
  newStartDate: Date,
  newEndDate: Date,
  userExistingLeaves: Array<Leave>
): boolean => {
  newStartDate = new Date(newStartDate);
  newEndDate = new Date(newEndDate);

  if (!userExistingLeaves.length) {
    return false;
  }

  userExistingLeaves.sort(
    (date1: any, date2: any) => date1.startDate - date2.startDate
  );

  for (let i = 0; i < userExistingLeaves.length - 1; i++) {
    const leave: any = userExistingLeaves[i];
    //new startdate should not be between existing leave
    if (newStartDate >= leave.startDate && newStartDate <= leave.endDate) {
      return false;
    }

    //new end date should also not be between existing leave
    if (newEndDate >= leave.startDate && newEndDate <= leave.endDate) {
      return false;
    }
  }
  return true;
};
