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
      //lookup used for getting corresponding orders for each customer 
      {
        $lookup:{
          from :"orders",
          localField:"_id",
          foreignField:"customer_id",
          as:"orderDetails"
        },
      },

    
      {
        $unwind: '$orderDetails'
      },
      {
        $group:{
          _id:"$orderDetails.customer_id",
          totalSales:{$sum:"$orderDetails.total_amount"},
          totalOrders :{$sum:1},
          customer_name:{$first:"$name"}
        }
      }
      ,{
        $project:{
          customer_name:  1,
          totalSales:1,
          totalOrders:1,
          _id:0
        }
      }
    ])
   

    res.status(200).json({
      success:true,
      message:"Sales per customer fetched successfully",
      data:aggregateTable
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
