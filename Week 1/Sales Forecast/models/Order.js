import mongoose, { Schema } from "mongoose";

const itemSchema = Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total Price is required"],
    },
  },
  { _id: false }
);

const OrderSchema = Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  items: [itemSchema],
  totalQuantity: {
    type: Number,
    required: [true, "Total Order Quantity is required"],
  },
  totalAmount: {
    type: Number,
    required: [true,"Total Amount is required"],
  },
  averageOrderQuantity: {
    type: Number,
    required: [true,"Average Order Quantity is required"],
  },
});

export const Order = mongoose.model("Order", OrderSchema);
