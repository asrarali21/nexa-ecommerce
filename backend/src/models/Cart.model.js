import mongoose, { Schema } from "mongoose"


const Cartitemschema = new Schema({
    product :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    quantity :{
        type:Number,
        default : 1 , 
        min :1
    }
})


const cartschema = new Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref :"User",
        unique: true,       // one cart per user
       required: true 
    },
    items :[Cartitemschema]
}, {timestamps:true})



export const Cart =  mongoose.model('Cart', cartschema)