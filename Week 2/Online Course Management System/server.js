import sequelize from "./config/database.js";
import express from "express";
import morgan from "morgan";
import coursesRoutes from "./routes/coursesRoutes.js";
import instructorsRoutes from "./routes/instructorsRoutes.js";
import studentRoutes from "./routes/studentsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import enrollmentRoutes from "./routes/enrollmentsRoutes.js"

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const PORT = 3000;
const BASE_URL = "/api";

// sequelize.sync({alter:true})
sequelize.sync();

//routes
app.use(`${BASE_URL}/courses`, coursesRoutes);
app.use(`${BASE_URL}/instructors`, instructorsRoutes);
app.use(`${BASE_URL}/students`, studentRoutes);
app.use(`${BASE_URL}/categories`, categoriesRoutes);
app.use(`${BASE_URL}/enrollments`, enrollmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
