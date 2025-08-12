import type { Request, Response } from "express";
import {
  fetchRolePriority,
  generateToken,
  hashPassword,
  toDataUri,
  type ApiResponse,
} from "../lib/utils.ts";
import API_MESSAGES from "../lib/constants.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  userLoginSchema,
  userRegistrationSchema,
  userUpdateSchema,
  userUpdateSchemaByHigherAuthority,
} from "../lib/validateSchema.ts";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler.ts";
import prisma from "../lib/db.ts";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { error } = userLoginSchema.validate({ ...req.body });

    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    //check if user exists

    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.AUTH.INVALID_CREDENTAILS,
      });
    }

    //check if password is valid or not

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,

        error: API_MESSAGES.AUTH.INVALID_CREDENTAILS,
      });
    }

    const { createdAt, updatedAt, ...user } = existingUser;

    const token = generateToken(user);
    res.status(200).json({
      success: true,
      message: API_MESSAGES.USER.LOGIN_SUCCESS,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.USER.LOGIN_ERROR,
    });
  }
};

export const updateUser = async (req: Request, res: Response<ApiResponse>) => {
  try {
    //user request validation
    const { error } = userUpdateSchema.validate({ ...req.body });
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    console.log(req.body);
    const dataToBeUpdated = { ...req.body };

    req.file ? (dataToBeUpdated.image = toDataUri(req.file.path)) : {};

    const updatedData = await prisma.user.updateMany({
      where: { id: req.user.id },
      data: dataToBeUpdated,
    });

    res.status(200).json({
      success: true,
      message: updatedData.count
        ? API_MESSAGES.DATA.UPDATE_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: updatedData.count ? updatedData : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.UPDATE_ERROR,
    });
  }
};

export const updateUserDetails = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    //user id
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.USER.INVALID_USER_ID,
      });
    }

    //check if user to be updated exists
    const userToBeUpdated = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userToBeUpdated) {
      return res.status(404).json({
        success: false,
        error: API_MESSAGES.USER.INVALID_USER_ID,
      });
    }

    //check if user has the authority to update the user
    const userToBeUpdatedPriority = await fetchRolePriority(
      undefined,
      userToBeUpdated?.roleId
    );
    const currentUserPrioiry = await fetchRolePriority(
      undefined,
      req.user.roleId
    );

    if (currentUserPrioiry <= userToBeUpdatedPriority) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.AUTH.UNAUTHORIZED,
      });
    }

    //user request validation
    const { error } = userUpdateSchemaByHigherAuthority.validate({
      ...req.body,
    });
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    const dataToBeUpdated = { ...req.body };

    req.file ? (dataToBeUpdated.image = toDataUri(req.file.path)) : {};
    req?.body?.password
      ? (dataToBeUpdated.password = await hashPassword(req.body.password))
      : {};

    const updatedData = await prisma.user.updateMany({
      where: { id: Number(userId) },
      data: dataToBeUpdated,
    });

    res.status(200).json({
      success: true,
      message: updatedData.count
        ? API_MESSAGES.DATA.UPDATE_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: updatedData.count ? updatedData : [],
    });
  } catch (error) {
   
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.UPDATE_ERROR,
    });
  }
};

export const deleteUser = async (req: Request, res: Response<ApiResponse>) => {
  try {
    //user id
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.USER.INVALID_USER_ID,
      });
    }

    //check if user to be delete exists
    const userToBeDeleted = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userToBeDeleted) {
      return res.status(404).json({
        success: false,
        error: API_MESSAGES.USER.INVALID_USER_ID,
      });
    }

    //check if user has the authority to delete the user
    const userToBeDeletedPriority = await fetchRolePriority(
      undefined,
      userToBeDeleted?.roleId
    );
    const currentUserPrioiry = await fetchRolePriority(
      undefined,
      req.user.roleId
    );

    if (currentUserPrioiry <= userToBeDeletedPriority) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.AUTH.UNAUTHORIZED,
      });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: Number(userId) },
    });

    res.status(200).json({
      success: true,
      message: deletedUser
        ? API_MESSAGES.DATA.DELETE_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: deletedUser ? deletedUser : [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.DELETE_ERROR,
    });
  }
};
