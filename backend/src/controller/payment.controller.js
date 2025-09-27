import { Order } from "../models/Order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { razorpay } from "../utils/razorpay.js";
import crypto from "crypto"


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

const verifyPayment = asyncHandler (async(req ,res)=>{
  
    const {razorpay_payment_id ,razorpay_order_id , razorpay_signature , orderId} = req.body


    const order = await Order.findById(orderId)
   if (!order) {
     throw new ApiError(404 , "Order not found")
   }

   const generated_signature = crypto.createHmac("sha256" , process.env.RAZORPAY_KEY_SECRET)
   .update(razorpay_order_id + "|" + razorpay_payment_id)
   .digest("hex")

   if (!generated_signature) {
    throw new ApiError(400 , "payment verification failed")
   }

   if (generated_signature === razorpay_signature) {
       order.PaymentStatus = "SUCCESS"
       order.razorpayPaymentId = razorpay_payment_id,
       order.razorpaySignature = razorpay_signature
       await order.save()
   }


   res.status(200)
   .json(new ApiResponse(200 , order , "payment verified successfully"))

})




export {CreateOrderRazorpay , verifyPayment}