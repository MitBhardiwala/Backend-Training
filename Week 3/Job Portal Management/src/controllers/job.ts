import z from "zod";
import { zodGlobalErrorHandler } from "../lib/zodErrorHandler.ts";
import type { Request, Response } from "express";
import type { ApiResponse, Job } from "../types/index.ts";
import API_MESSAGES from "../lib/constants.ts";
import { createJobSchema } from "../lib/validateSchema.ts";
import { checkExistingCompany } from "../lib/utils.ts";
import prisma from "../lib/db.ts";

export const createJob = async (req: Request, res: Response<ApiResponse>) => {
  try {
    createJobSchema.parse(req.body);

    const recruiterCompany = await prisma.company.findUnique({
      where: { userId: req.user.id },
    });

    if (!recruiterCompany) {
      return res.status(500).json({
        success: false,
        message: API_MESSAGES.JOB.ADD_ERROR,
      });
    }

    const newJobData: Job = {
      ...req.body,
      companyId: recruiterCompany.id,
    };
    const newJob = await prisma.job.create({
      data: newJobData,
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.JOB.ADD_SUCCESS,
      data: newJob,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.status(500).json({
      success: false,
      message: API_MESSAGES.JOB.ADD_ERROR,
    });
  }
};

export const fetchJobsList = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const jobs = await prisma.job.findMany({});

    res.status(200).json({
      success: true,
      message: jobs
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: jobs ? jobs : [],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};

export const fetchJobById = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const { id } = req.params;
    const job = await prisma.job.findUnique({ where: { id: Number(id) } });

    return res.status(200).json({
      success: true,
      message: job
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: job ? job : [],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodGlobalErrorHandler(error, res);
    }
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};

export const deleteJob = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;

    //check if job exists
    const existingJob = await prisma.job.findUnique({
      where: { id: Number(id) },
    });

    if (!existingJob) {
      return res.status(400).json({
        success: false,
        message: API_MESSAGES.DATA.NOT_FOUND,
      });
    }

    const deletedJob = await prisma.job.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.DELETE_SUCCESS,
      data: deletedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.DELETE_ERROR,
    });
  }
};
