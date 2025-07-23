import express from "express";

import todoRoutes from "./routes/todoRoutes.js"
import morgan from "morgan";
import {logTimeStampMiddleware} from "./middlewares/timeStampMiddleWare.js"

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(logTimeStampMiddleware)

const port = 3000;

//todo Routes
app.use('/todos',todoRoutes)

app.get("/check", (req, res) => {
  res.json({
    success: true,
    message: "Server is running properly",
  });
});




app.listen(port, () => {
  console.log(`Server running at port ${3000}`);
});
