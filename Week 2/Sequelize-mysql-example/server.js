import express from "express";

import morgan from "morgan";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"

const app = express();

const PORT = 3000;

app.use(express.json());
// sequelize.sync({alter:true});
sequelize.sync()

app.use(morgan("dev"));

app.use("/users",userRoutes)
app.use("/posts",postRoutes)
app.use("/employees",employeeRoutes)



app.get("/", (req, res) => {
  res.json({
    message: "Server is running properly",
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
