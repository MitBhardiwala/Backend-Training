import express from "express";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";
const router = express.Router();

router.post("/add-product", async (req, res) => {
  try {
    const body = req.body;

    const newProduct = new Product(body);
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product has been added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log("Error in adding product : ", error);
    res.status(500).json({
      success: false,
      message: "Error in adding product",
      error,
    });
  }
});

router.get("/top-3-selled-products", async (req, res) => {
  try {
    const aggregateTable = await Order.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.product_id",
          totalRenvenue: { $sum: "$items.total_price" },
          numberOfTimesOrdered:{$sum:"$items.quantity"}
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
          product_name: "$productDetails.name",
          totalRenvenue: "$totalRenvenue",
          numberOfTimesOrdered:1,
          _id: 0,
        },
      },
    ])
      .sort({ totalRenvenue: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      message: "Top 3 selled products fetched successfully",
      data: aggregateTable,
    });
  } catch (error) {
    console.log("Error in fetching top 3 selled products :", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching top 3 selled products",
      error,
    });
  }
});

export default router;
