import express, { application } from "express";
import authRoutes from "./routes/auth.ts";
import morgan from "morgan";
import userRoutes from "./routes/user.ts";
import companyRoutes from "./routes/company.ts";
import jobRoutes from "./routes/job.ts";
import applicationRoutes from "./routes/application.ts"

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));



app.get("/", (req, res) => {
  res.send("hello");
});



app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
