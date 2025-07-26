import mongoose, { Schema } from "mongoose";

const itemSchema = Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    total_price:{
      type:Number,
      required:true
    }
  },
  { _id: false }
);

const OrderSchema = Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  items: [itemSchema],
  total_quantity: {
    type: Number,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  average_order_quantity: {
    type: Number,
    required: true,
  },
});

export const Order = mongoose.model("Order", OrderSchema);
