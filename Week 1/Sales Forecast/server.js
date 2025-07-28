import express from "express";
import { connectDB } from "./db.js";
import customerRoutes from "./routes/CustomerRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";
import morgan from "morgan";
import { Order } from "./models/Order.js";
import { API_MESSAGES } from "./utils/constants.js";

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
app.get("/getMonthlySalesTrendData", async (req, res) => {
  try {
    //get current data
    let currentDate = new Date();

    //let date less than one year
    let oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const aggregateTable = await Order.aggregate([
      {
        $addFields: {
          orderMonth: { $dateToString: { format: "%B", date: "$orderDate" } },
        },
      },
      {
        $match: {
          orderDate: {
            $gte: oneYearAgo,
          },
        },
      },
      {
        $group: {
          _id: "$orderMonth",
          totalSales: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          monthName: "$_id",
          totalSales: "$totalSales",
          _id: 0,
          totalOrders: 1,
        },
      },
    ]).sort({ totalSales: 1 });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: aggregateTable,
    });
  } catch (error) {
    console.log("Error in fetching monthly sales trend : ", error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
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
