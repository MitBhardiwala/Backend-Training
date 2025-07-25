import express from "express";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

const router = express.Router();

router.post("/add-order", async (req, res) => {
  try {
    const body = req.body;

    //fetch all ids
    const productIds = body.items.map((item) => item.product_id);

    //fetch all purchased product details
    const productsPurchased = await Product.find({ _id: { $in: productIds } });

    const total_quantity = body.items.reduce((accumulator, current_item) => {
      return accumulator + current_item.quantity;
    }, 0);

    const total_amount = productsPurchased.reduce(
      (accumulator, current_item, index) => {
        console.log(current_item.price);
        return accumulator + current_item.price * body.items[index].quantity;
      },
      0
    );

    const average_order_quantity = productsPurchased.length;

    const newOrderJSON = {
      customer_id: body.customer_id,
      items: body.items,
      total_quantity: total_quantity,
      total_amount: total_amount,
      average_order_quantity: average_order_quantity,
    };

    const newOrder = new Order(newOrderJSON);
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order has been added successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log("Error in adding order : ", error);
    res.status(500).json({
      success: false,
      message: "Error in adding order",
      error,
    });
  }
});

router.get(
  "/get-orders-greater-than-average-order-quantity",
  async (req, res) => {
    try {
      const ordersFetched = await Order.find({
        $expr: {
          $lt: ["$average_order_quantity", "$total_quantity"], // $lt for less than, comparing fieldA and fieldB
        },
      });
      res.status(200).json({
        success: true,
        message:
          "Orders greater than average order qunatity fetched successfully",
        total_orders: ordersFetched.length,
        data: ordersFetched,
      });
    } catch (error) {
      console.log("error in fetching orders details", error);
      res.status(500).json({
        success: false,
        message: "Error in fetching in order details",

        error,
      });
    }
  }
);

export default router;
