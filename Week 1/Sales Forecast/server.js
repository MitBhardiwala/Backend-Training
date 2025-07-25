import express from "express";
import { connectDB } from "./db.js";
import customerRoutes from "./routes/CustomerRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import dotenv from "dotenv"
import morgan from "morgan";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

connectDB();

//customer routes
app.use("/customer", customerRoutes);

//product routes
app.use("/product",ProductRoutes)

//order routes
app.use("/order",orderRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running properly",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
