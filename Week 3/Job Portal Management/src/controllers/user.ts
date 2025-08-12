import type { Request, Response } from "express";
import type { ApiResponse } from "../types/index.ts";
import z, { success } from "zod";
import API_MESSAGES from "../lib/constants.ts";
import prisma from "../lib/db.ts";
import { updateUserSchema } from "../lib/validateSchema.ts";
import { zodGlobalErrorHandler } from "../lib/zodErrorHandler.ts";

export const fetchUser = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message: user
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.USER.NOT_FOUND,
      data: user ? user : [],
    });
  } catch (error) {
    res.json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      error,
    });
  }
};
export const updateUser = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;

    updateUserSchema.parse(req.body);

    //check if user exists ot not
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: API_MESSAGES.USER.NOT_FOUND,
        data: [],
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.UPDATE_SUCCESS,
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.json({
      success: false,
      message: API_MESSAGES.DATA.UPDATE_ERROR,
      error,
    });
  }
};


