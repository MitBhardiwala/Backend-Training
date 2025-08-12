import express from "express";
import workerRoutes from "./routes/workerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
const PORT = 3000;

//worker routes
app.use("/workers", workerRoutes);

//user routes
app.use("/users", userRoutes);

//post routes
app.use("/posts", postRoutes);

//category Routes
app.use("/category", categoryRoutes);

app.listen(PORT),
  () => {
    console.log(`Server runnin on port ${PORT}`);
  };
