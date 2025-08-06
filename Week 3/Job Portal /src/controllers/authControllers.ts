import prisma from "../lib/db.ts";
import API_MESSAGES from "../lib/constants.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY: any = process.env.JWT_SECRET;

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

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
      newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: API_MESSAGES.USER.ADD_ERROR,
    });
  }
};

export const loginUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "User logged in successfully" });
};
