import sequelize from "./config/database.js";
import {Worker,Bonus,Department} from "./models/index.js"
import express from "express";
import WorkerRoutes from "./routers/workerRoutes.js";
import DepartmentRoutes from "./routers/departmentRoutes.js"
import morgan from "morgan";

const app = express();
app.use(morgan('dev'))

sequelize.sync();

const PORT= 3000;

//worker routes
app.use("/workers",WorkerRoutes)

//department routes
app.use("/department",DepartmentRoutes)


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})



