import express, { type Request, type Response } from "express";
import studentRoutes from "./routes/studentRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import hodRoutes from "./routes/hodRoutes.ts";

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(morgan("dev"));
app.use(express.json());

//student routes
app.use("/student", upload.single("image"), studentRoutes);

//user routes
app.use("/user", userRoutes);

//hod routes
app.use("/hod", hodRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running properly ");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
