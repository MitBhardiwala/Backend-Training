import mongoose, { Schema } from "mongoose";

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Product Name is required"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product Price is required"],
  },
  stockQuantity: {
    type: Number,
    required: [true, "Product Stock Quantity is required"],
    min: 0,
  },
});

export const Product = mongoose.model("Product", ProductSchema);
