import express, { application } from "express";
import authRoutes from "./routes/authRoutes.ts";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.ts";
import companyRoutes from "./routes/companyRoutes.ts";
import jobRoutes from "./routes/jobRoutes.ts";
import applicationRoutes from "./routes/applicationRoutes.ts"

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

//auth routes
app.use("/auth", authRoutes);

//user routes
app.use("/user", userRoutes);

//company routes
app.use("/company", companyRoutes);

//job routes
app.use("/job", jobRoutes);

//application ROutes
app.use("/application",applicationRoutes)

app.get("/", (req, res) => {
  res.send("hello");
});



app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
