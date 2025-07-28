import express from "express";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { API_MESSAGES } from "../utils/constants.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/addOrder", async (req, res) => {
  try {
    const body = req.body;

    //fetch all ids
    const productIds = body.items.map(
      (item) => new mongoose.Types.ObjectId(item.productId)
    );
    //fetch all purchased product details
    const productsPurchased = await Product.find({ _id: { $in: productIds } });

    console.log(productsPurchased);

    const totalQuantity = body.items.reduce((accumulator, current_item) => {
      return accumulator + current_item.quantity;
    }, 0);

    const totalAmount = productsPurchased.reduce(
      (accumulator, currentItem, index) => {
        console.log(currentItem.price);
        return accumulator + currentItem.price * body.items[index].quantity;
      },
      0
    );

    //added total_price for each product purchased (helpful to track price if multiple products are purchased)

    productsPurchased.map((product, index) => {
      body.items[index].totalPrice = body.items[index].quantity * product.price;
    });

    const averageOrderQuantity = productsPurchased.length;

    const newOrderJSON = {
      customerId: body.customerId,
      items: body.items,
      totalQuantity: totalQuantity,
      totalAmount: totalAmount,
      averageOrderQuantity: averageOrderQuantity,
    };

    const newOrder = new Order(newOrderJSON);
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: API_MESSAGES.SUCCESS.ORDER_ADDED,
      data: newOrder,
    });
  } catch (error) {
    console.log("Error in adding order : ", error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.ORDER_NOT_ADDED,
      error,
    });
  }
});

router.get(
  "/getOrdersGreaterThanAverageQuantity",
  async (req, res) => {
    try {
      const ordersFetched = await Order.find({
        $expr: {
          $lt: ["$averageOrderQuantity", "$totalQuantity"], 
        },
      });
      res.status(200).json({
        success: true,
        message: API_MESSAGES.SUCCESS.DATA_FETCHED,
        total_orders: ordersFetched.length,
        data: ordersFetched,
      });
    } catch (error) {
      console.log("error in fetching orders details", error);
      res.status(500).json({
        success: false,
        message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
        error,
      });
    }
  }
);

export default router;
