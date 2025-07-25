import mongoose, { Schema } from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {  
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export const Customer = new mongoose.model("Customer", CustomerSchema);
