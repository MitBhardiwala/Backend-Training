import express, { type Request, type Response } from "express";
import apiRoutes from "./routes/index.ts";
import morgan from "morgan";
import cors from "cors";
import { setupCronJobs } from "./lib/cronJob.ts";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// setupCronJobs();

app.use("/", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running properly ");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
