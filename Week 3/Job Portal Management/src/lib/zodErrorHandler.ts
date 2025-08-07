// src/middleware/errorHandler.ts
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { ApiResponse } from "../types/index.ts";
import API_MESSAGES from "./constants.ts";

export const zodGlobalErrorHandler = (
  err: ZodError,
  res: Response<ApiResponse>
) => {
  return res.status(400).json({
    success: false,
    error: err.issues.map((error) => ({
      path: error.path,
      message: error.message,
    })),
    message: API_MESSAGES.VALIDATION.ZOD_ERROR,
  });
};
