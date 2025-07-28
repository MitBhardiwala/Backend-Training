import express from "express";
import { Customer } from "../models/Customer.js";
import { Order } from "../models/Order.js";
import { API_MESSAGES } from "../utils/constants.js";

const router = express.Router();

router.post("/addCustomer", async (req, res) => {
  try {
    const body = req.body;

    const newCustomer = new Customer(body);
    await newCustomer.save();

    res.status(201).json({
      success: true,
      message: API_MESSAGES.SUCCESS.CUSTOMER_ADDED,
      data: newCustomer,
    });
  } catch (error) {
    console.log("Error in adding customer : ", error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.CUSTOMER_NOT_ADDED,
      error,
    });
  }
});

router.get("/getTotalSalesPerCustomer", async (req, res) => {
  try {
    const aggregateTable = await Customer.aggregate([
      //lookup used for getting corresponding orders for each customer
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orderDetails",
        },
      },

      {
        $unwind: "$orderDetails",
      },
      {
        $group: {
          _id: "$orderDetails.customerId",
          totalSales: { $sum: "$orderDetails.totalAmount" },
          totalOrders: { $sum: 1 },
          customerName: { $first: "$name" },
        },
      },
      {
        $project: {
          customerName: 1,
          totalSales: 1,
          totalOrders: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: aggregateTable,
    });
  } catch (error) {
    console.log("Error in fetching sales per customer : ", error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
});

export default router;
