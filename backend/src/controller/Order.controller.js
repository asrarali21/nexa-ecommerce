import { Order } from "../models/Order.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




const createOrder = asyncHandler(async(req , res)=>{
   const {product} = req.body

   if (!product) {
    throw new ApiError(400 , "Cant find Product Id")
   }

   const productDocs = await Product.findById(product).select("price")

   const amount = Number(productDocs.price)

   const order = await Order.create({
      user: req.user._id,
      product,
      amount,
      PaymentStatus:"PENDING"
   })


   res.status(200)
   .json(new ApiResponse(200 , order , "Successfully Create Order"))
})



export {createOrder}
