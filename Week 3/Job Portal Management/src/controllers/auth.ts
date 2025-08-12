import prisma from "../lib/db.ts";
import API_MESSAGES from "../lib/constants.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import { loginUserSchema, registerUserSchema } from "../lib/validateSchema.ts";
import z from "zod";
import type { ApiResponse, User } from "../types/index.ts";
import { zodGlobalErrorHandler } from "../lib/zodErrorHandler.ts";

dotenv.config();

const SECRET_KEY: any = process.env.JWT_SECRET;

export const registerUser = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    registerUserSchema.parse(req.body);

    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    //check for existing User
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: API_MESSAGES.USER.ALREADY_EXISTS,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, {
      expiresIn: "4h",
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.USER.ADD_SUCCESS,
      data: newUser,
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.status(500).json({
      success: false,
      message: API_MESSAGES.USER.ADD_ERROR,
    });
  }
};

export const loginUser = async (req: Request, res: Response<ApiResponse>) => {
  try {
    loginUserSchema.parse(req.body);
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: API_MESSAGES.LOGIN.ERROR,
        error: API_MESSAGES.AUTH.INVALID_CREDENTAILS,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: API_MESSAGES.LOGIN.ERROR,
        error: API_MESSAGES.AUTH.INVALID_CREDENTAILS,
      });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "4h",
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.LOGIN.SUCCESS,
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.status(500).json({
      success: false,
      error: API_MESSAGES.LOGIN.ERROR,
    });
  }
};

