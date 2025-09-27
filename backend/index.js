import app from "./app.js";
import connectDB from "./src/db/db.js";
import dotenv from "dotenv"
import {v2 as cloudinary } from "cloudinary";


dotenv.config()

console.log("key Id",process.env.RAZORPAY_KEY_ID)

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

connectDB().then(()=>{
    app.listen( process.env.PORT, ()=>{
        console.log(`server listening at ${process.env.PORT}`);
    } )
}).catch((error)=>{
    console.log("mongodb error " , error);
})
