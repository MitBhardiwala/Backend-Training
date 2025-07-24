import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import BookRoutes from "./routes/bookRoutes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

//load environment variables
dotenv.config();

//port
const PORT = process.env.PORT || 3000;

//connect to MongoDB database
connectDB();

//Book Routes
app.use("/books", BookRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running properly",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
