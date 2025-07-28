import express from "express";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";
import { API_MESSAGES } from "../utils/constants.js";
const router = express.Router();

router.post("/addProduct", async (req, res) => {
  try {
    const body = req.body;

    const newProduct = new Product(body);
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PRODUCT_ADDED,
      data: newProduct,
    });
  } catch (error) {
    console.log("Error in adding product : ", error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.PRODUCT_NOT_ADDED,
      error,
    });
  }
});

router.get("/top3SelledProducts", async (req, res) => {
  try {
    const aggregateTable = await Order.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.productId",
          totalRenvenue: { $sum: "$items.totalPrice" },
          numberOfTimesOrdered: { $sum: "$items.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          productName: "$productDetails.name",
          totalRenvenue: "$totalRenvenue",
          numberOfTimesOrdered: 1,
          _id: 0,
        },
      },
    ])
      .sort({ totalRenvenue: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      data: aggregateTable,
    });
  } catch (error) {
    console.log("Error in fetching top 3 selled products :", error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
});

export default router;
