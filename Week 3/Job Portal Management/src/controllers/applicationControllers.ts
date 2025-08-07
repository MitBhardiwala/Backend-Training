import type { Request, Response } from "express";
import type { ApiResponse } from "../types/index.ts";
import API_MESSAGES from "../lib/constants.ts";
import { createApplicationSchema } from "../lib/validateSchema.ts";
import { zodGlobalErrorHandler } from "../lib/zodErrorHandler.ts";
import z from "zod";
import prisma from "../lib/db.ts";

export const applyForJob = async (req: Request, res: Response<ApiResponse>) => {
  try {
    createApplicationSchema.parse(req.body);

    //check if existingApplication exists
    const existingApplication = await prisma.application.findMany({
      where: {
        AND: [{ userId: req.user.id }, { jobId: req.body.jobId }],
      },
    });

    if (existingApplication.length) {
      return res.status(409).json({
        success: false,
        error: API_MESSAGES.APPLICATION.ALREADY_EXISTS,
      });
    }

    //check if job for whihc user is applying exists or not
    const existingJob = await prisma.job.findUnique({
      where: { id: req.body.jobId },
    });

    if (!existingJob) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.DATA.NOT_FOUND,
      });
    }

    const applicationData = { ...req.body, userId: req.user.id };

    const newApplication = await prisma.application.create({
      data: applicationData,
    });

    return res.status(201).json({
      success: true,
      message: API_MESSAGES.APPLICATION.ADD_SUCCESS,
      data: newApplication,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.status(500).json({
      success: false,
      error: API_MESSAGES.APPLICATION.ADD_ERROR,
    });
  }
};

export const fetchApplicationsForUser = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const applications = await prisma.user.findMany({
      where: {
        id: req.user.id,
      },
      include: {
        Application: {
          include: {
            Job: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: applications.length
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: applications,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
export const fetchApplicationsForRecruiter = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const recruiterCompanyId = await prisma.company.findUnique({
      where: { userId: req.user.id },
    });

    if (!recruiterCompanyId) {
      return res.status(500).json({
        success: false,
        error: API_MESSAGES.DATA.FETCH_ERROR,
      });
    }

    

    const applications = await prisma.user.findMany({
      where: {
        id: req.user.id,
      },

      include: {
        Company: {
          include:{
            Jobs:{
              include:{
                Application:true
              }
            }
          }
        }
      },
    });

    return res.status(200).json({
      success: true,
      message: applications.length
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: applications,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
