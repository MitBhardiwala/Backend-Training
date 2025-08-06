import express from "express";
import authRoutes from "./routes/authRoutes.ts";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

//auth routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
