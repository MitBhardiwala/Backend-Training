import express from "express";
import connectDB from "./db.js";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const PORT = 3000;

//connect to mongoDB
connectDB();

//middleware for parsing json
app.use(express.json());

//morgan to log request info
app.use(morgan("dev"));

//users route
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running properly",
  });
});

app.all("/{*any}", (req, res) => {
  res.status(404).json({
    message: "The route for this path does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
