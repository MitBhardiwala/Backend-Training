import express, { type Request, type Response } from "express";
import userRoutes from "./routes/userRoutes.ts";
import morgan from "morgan";
import multer from "multer";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

// Initialize Multer with the storage engine
const upload = multer({ dest: "uploads/" });

//user routes
app.use("/user", upload.single("image"), userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running properly ");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
