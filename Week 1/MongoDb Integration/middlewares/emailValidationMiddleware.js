export const emailValidationMiddleware = (req, res, next) => {
  const body = req.body;
  if (!body?.email) {
    return res.status(400).json({
      success: false,
      message: "Email not found.",
    });
  }

  if (!body?.email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email cannot not be empty.",
    });
  }

  if (!body.email.match(/^\S+@\S+\.\S+$/)) {
    return res.status(400).json({
      success: false,
      message: "Email format is incorrect.",
    });
  }

  
  next();
};
