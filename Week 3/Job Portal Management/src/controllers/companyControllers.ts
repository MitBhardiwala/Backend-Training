import type { NextFunction, Request, Response } from "express";
import { zodGlobalErrorHandler } from "../lib/zodErrorHandler.ts";
import type { ApiResponse, Company } from "../types/index.ts";
import z from "zod";
import API_MESSAGES from "../lib/constants.ts";
import {
  createCompanySchema,
  updateCompanySchema,
} from "../lib/validateSchema.ts";
import prisma from "../lib/db.ts";
import { checkExistingCompany, checkValidUserId } from "../lib/utils.ts";

export const createCompany = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  try {
    createCompanySchema.parse(req.body);

    const { name, industry } = req.body;

    //check if company exists
    const existingCompany = await checkExistingCompany(name, req.user.id);

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: API_MESSAGES.COMPANY.ALREADY_EXISTS,
      });
    }

    const newCompanyData: Company = {
      name: name,
      industry: industry,
      userId: req.user.id,
    };

    const company = await prisma.company.create({
      data: newCompanyData,
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.COMPANY.ADD_SUCCESS,
      data: company,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.json({
      success: false,
      message: API_MESSAGES.COMPANY.ADD_ERROR,
      error,
    });
  }
};

export const fetchCompany = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.findUnique({
      where: { id: Number(id) },
    });

    res.json({
      success: true,
      message: company
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: company ? company : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
export const updateCompany = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const companyId = req.params.id;

    updateCompanySchema.parse(req.body);

    //check if company exists
    const existingCompany = await checkExistingCompany(Number(companyId));

    if (!existingCompany) {
      return res.status(400).json({
        success: false,
        message: API_MESSAGES.COMPANY.NOT_FOUND,
      });
    }

    //check for valid userId

    if (req.body.userId) {
      const validUserId = await checkValidUserId(req.body.userId);

      if (!validUserId) {
        return res.status(400).json({
          success: false,
          message: API_MESSAGES.USER.NOT_FOUND,
        });
      }
    }

    const updatedCompany = await prisma.company.update({
      where: { id: Number(companyId) },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.UPDATE_SUCCESS,
      data: updatedCompany,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.UPDATE_ERROR,
    });
  }
};
