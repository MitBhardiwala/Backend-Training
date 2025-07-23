export const logTimeStampMiddleware = (req, res, next) => {
  const timeStamp = new Date().toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  console.log(`${timeStamp} - ${req.method} ${req.url}`);
  next();
};
