import express from "express";
import { Customer } from "../models/Customer.js";
import { Order } from "../models/Order.js";

const router = express.Router();

router.post("/add-customer", async (req, res) => {
  try {
    const body = req.body;

    const newCustomer = new Customer(body);
    await newCustomer.save();

    res.status(201).json({
      success: true,
      message: "Customer has been added successfully",
      data: newCustomer,
    });
  } catch (error) {
    console.log("Error in adding customer : ", error);
    res.status(500).json({
      success: false,
      message: "Error in adding customer",
      error,
    });
  }
});

router.get("/total-sales-per-customer",async (req,res)=>{
  try {
    // const allCustomers = await Customer.find();

    const aggregateTable = await Customer.aggregate([
      {
        $lookup:{
          from :"orders",
          localField:"_id",
          foreignField:"customer_id",
          as:"orderDetails"
        }
      }
    ])


    const outputJSON = aggregateTable.map(user=>{
      const name=user.name;
      const totalSales = user.orderDetails.reduce((accumulator,current_order)=>{
        return accumulator+current_order.total_amount
      },0);

      return {
        customer_name:name,
        totalSales:totalSales
      }
     
    })

    res.status(200).json({
      success:true,
      message:"Sales per customer fetched successfully",
      data:outputJSON
    })

  } catch (error) {
    console.log("Error in fetching sales per customer : ",error);
    res.status(500).json({
      success:false,
      message:"Error in fetching sales",
      error
    })
  }
})

export default router;
