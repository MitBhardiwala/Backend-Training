import express, { type Request, type Response } from "express";
import studentRoutes from "./routes/studentRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import morgan from "morgan";
import facultyRoutes from "./routes/facultyRoutes.ts";
import hodRoutes from "./routes/hodRoutes.ts";
import adminRoutes from "./routes/adminRoutes.ts";
import { upload } from "./lib/multerConfig.ts";

import {
  authenticateAdmin,
  authenticateFaculty,
  authenticateHod,
  authenticateToken,
  checkDeptAssigned,
} from "./middleware/authMiddleware.ts";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

//student routes
app.use("/student", upload.single("image"), studentRoutes);

//user routes
app.use("/user", userRoutes);

//hod routes
app.use(
  "/hod",
  authenticateToken,
  authenticateHod,
  checkDeptAssigned,
  hodRoutes
);

//faculty routes
app.use(
  "/faculty",
  authenticateToken,
  authenticateFaculty,
  checkDeptAssigned,
  facultyRoutes
);

//Admin routes
app.use("/admin", authenticateToken, authenticateAdmin, adminRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running properly ");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
