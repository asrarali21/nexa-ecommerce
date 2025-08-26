import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"



const verifyuser = async(req , res ,next)=>{
try {
    const token = req.cookies?.accessToken || 
                     req.header("Authorization")?.replace("Bearer ", "")
    
    if (!token) {
         throw new ApiError(400 , "no token found")
    }
    
     const decodetoken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
     if (!decodetoken) {
        throw new ApiError(400 , "invlaid credentials ")
     }
    
     req.user = decodetoken
     
     next()
} catch (error) {
   next(new ApiError(401, "Invalid or expired token"));
}
}

export default verifyuser