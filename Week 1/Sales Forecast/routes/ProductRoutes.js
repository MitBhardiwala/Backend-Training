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


export default router;
