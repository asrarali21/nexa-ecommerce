import { Order } from "../models/Order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { razorpay } from "../utils/razorpay.js";


const CreateOrderRazorpay = asyncHandler(async(req , res)=>{
     
    const {orderId} = req.body

   const order = await Order.findById(orderId)

   if (!order) {
      throw new ApiError(400 , "Cloud not find order")
   }



    const options ={
        amount : order.amount * 100,
        currency : order.currency,
        receipt: order._id.toString()
    }

    console.log(options);
    


    const razorpayOrder = await razorpay.orders.create(options);

    console.log("razorpay order",razorpayOrder);
    

    order.razorpayOrderId = razorpayOrder.id

    await order.save();

    const RazorpayOrderDetails ={
      razorpayOrder,
      orderId:order._id

    }

    res.status(200)
    .json(new ApiResponse(200 , RazorpayOrderDetails , "succesfully Razorpay Order Created"))

})




export {CreateOrderRazorpay}