import express from "express";
import { connectDB } from "./db.js";
import customerRoutes from "./routes/CustomerRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";
import morgan from "morgan";
import { Order } from "./models/Order.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

connectDB();

//customer routes
app.use("/customer", customerRoutes);

//product routes
app.use("/product", ProductRoutes);

//order routes
app.use("/order", orderRoutes);

export const months = [];

//monthly sales trend
app.get("/monthly-sales-trends", async (req, res) => {
  try {

    //get current data
    let currentDate = new Date();

    //let date less than one year
    let oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const aggregateTable = await Order.aggregate([
      {
        $addFields: {
          order_month: { $dateToString: { format: "%B", date: "$order_date" } },
        },
      },
      {
        $match: {
          order_date: {
            $gte:oneYearAgo,
          },
        },
      },
      {
        $group: {
          _id: "$order_month",
          total_sales: { $sum: "$total_amount" },
          total_orders:{ $sum:1}
        },
      },
      {
        $project: {
          month_name: "$_id",
          total_sales: "$total_sales",
          _id: 0,
          total_orders:1
        },
      },
    ]).sort({total_sales:1});

    res.status(200).json({
      success: true,
      message: "Monthly sales trend data fetched successfully",
      data: aggregateTable,
    });
  } catch (error) {
    console.log("Error in fetching monthly sales trend : ", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching monthly sales trend data",
      error,
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running properly",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
