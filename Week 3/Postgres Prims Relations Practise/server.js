import express from "express";
import userRoutes from "./routes/UserRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

//user routes
app.use("/users", userRoutes);

//category routes
app.use("/category", categoryRoutes);

//course routes
app.use("/course", courseRoutes);

//enrollments routes
app.use("/enrollments", enrollmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
