import mongoose, { Schema } from "mongoose"


const orderSchema = new Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
     product :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    amount :{
       type : Number
    },
    PaymentStatus : {
      type : String,
      emum : ["PENDING","SUCCESS","FAILED"],
      default : "PENDING"
    },
     razorpayOrderId: { 
    type: String
 },
  razorpayPaymentId: {
     type: String 
    },
  razorpaySignature: {
     type: String 
    },
    PaidAt : {
        type:Date
    }

    
}, {timestamps:true})



export const Order = mongoose.model("Order" , orderSchema)