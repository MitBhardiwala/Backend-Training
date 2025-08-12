import API_MESSAGES from "./constants.js";

export const joiGlobalErrorHandler = (err, res) => {
  res.status(400).json({
    success: false,
    message: API_MESSAGES.VALIDATION.JOI_ERROR,
    error: err.details.map((detail) => ({
      message: detail.message,
      path: detail.path,
    })),
  });
};
