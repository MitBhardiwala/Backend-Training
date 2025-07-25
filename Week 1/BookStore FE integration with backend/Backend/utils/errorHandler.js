const errorHandler = (err, res) => {
  err.statusCode = err.statusCode || 500;
  (err.message = err.message || "Internal server occured"),
    (err.errorInfo = err.errorInfo || "Something went wrong");
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err.errorInfo,
  });
};

export const globalErrorHandler = (err, res) => {
  if (err.code === 11000) {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `field value:${value} aleady exist. please use another`;
    err.message = message;
    err.statusCode = 400;

    errorHandler(err, res);
    console.log("Duplicate data error");
  } else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    err.message = message;
    err.statusCode = 400;
    errorHandler(err, res);
    console.log("Validation error");
  } else if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}.`;
    err.message = message;
    err.statusCode = 400;
    errorHandler(err, res);
    console.log("Casting error");
  } else {
    errorHandler(err, res);
  }
};
