import mongoose, { Schema } from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true,"Email is required"],
    unique: true,
    trim: true,
  },
  phone: {  
    type: Number,
    required: [true,"Phone number is required"],
  },
  address: {
    type: String,
    required: [true,"Address is required"],
  },
});

export const Customer = new mongoose.model("Customer", CustomerSchema);
