import { Order } from "../models/Order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { razorpay } from "../utils/razorpay.js";


const CreateOrderRazorpay = asyncHandler(async(req , res)=>{
     
    const {orderID} = req.body

   const order = await Order.findById(orderID)

    const options ={
        amount : order.amount,
        cucurrency : order.currency,
        receipt: order._id.toString()
    }


    const razorpayOrder = await razorpay.orders.create(options);



    


    
   
})