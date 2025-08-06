import type { NextFunction, Request, Response } from "express";
import API_MESSAGES from "../lib/constants.ts";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { userPayload } from "../types/index.ts";
import prisma from "../lib/db.ts";

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

    const userPayload = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

    const userDetails = await prisma.user.findUnique({
      where: { id: userPayload.userId },
    });

    req.user = userDetails;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.AUTH.INVALID_TOKEN,
    });
  }
};

export const authenticateApplicant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "APPLICANT") {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.AUTH.UNAUTHORIZED,
    });
  }
  next();
};
export const authenticateRecruiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "RECRUITER") {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.AUTH.UNAUTHORIZED,
    });
  }
  next();
};

export const fetchUserDetails = async (req: Request, res: Response) => {
  return res.status(500).json({
    success: false,
    message: API_MESSAGES.DATA.FETCH_SUCCESS,
    data: req.user,
  });
};
