import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"



const registerUser = asyncHandler(async(req , res)=>{
    const {name ,email , password} = req.body
    
    if ([name ,email , password].some((item)=>item.trim() === "")) {
        throw new ApiError(401 , "all feilds are required")
    }
     
    const existedUser = await User.findOne({
        $or:[{email}]
    })

    if (existedUser) {
        throw new ApiError(400 , "user already exist")
    }
     
    const user = await User.create({
        name,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(402 , "something went wrong while creating user")
    }

    return res.status(200).json(new ApiResponse(200 , createdUser, "user registered successfully"))

})


const loginUser = asyncHandler(async(req,res)=>{
    const {email , password} = req.body

    if (!email || !password) {
        throw new ApiError(400 , "Fields are required")
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new ApiError(401 , "user doesnt exist")
    }

    const isvalid = await user.IsPasswordCorrect(password)

    if (!isvalid) {
        throw new ApiError(401 , "incorrect password")
    }

    const accessToken =  user.generateAccessToken() 
    const refreshToken =   user.generateRefreshToken() 

    const loggedInuser = await User.findById(user._id).select("-password -refreshToken")

    const options ={
      httpOnly : true,
      secure : true 
    }

    res.status(200)
    .cookie("accessToken" ,accessToken , options) 
    .cookie("refreshToken" ,refreshToken , options) 
    .json(new ApiResponse(200 , loggedInuser , "user login successfully"))

})

const options ={
      httpOnly : true,
      secure : true,
      sameSite: "none"
    }
const logoutUser = asyncHandler (async(req ,res)=>{

    res.status(200)
    .clearCookie("accessToken" ,options) 
    .clearCookie("refreshToken" , options) 
    .json(new ApiResponse(200 , {} , "user logout successfully"))
})


const adminLogin = asyncHandler(async(req, res)=>{
    const {email, password} = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const accessToken = jwt.sign
        (
            {role:"admin"},
           process.env.ACCESS_TOKEN_SECRET,
           {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
        );
         const refreshToken = jwt.sign
        (
            {role:"admin"},
           process.env.REFRESH_TOKEN_SECRET,
           {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
        )

 const options = {
  httpOnly: true,
  secure: false,     // false on localhost
  sameSite: 'lax',
  path: '/',
}
        res
        .cookie("accessToken" , accessToken , options )
        .cookie("refreshToken" , refreshToken , options)
        .json(new ApiResponse(200 ,  "admin login successfully"))
    }
})

const adminlogout = asyncHandler(async(req , res) =>{

          const options = {
  httpOnly: true,
  secure: true,     
}
    res.status(200)
    .clearCookie("accessToken" ,options)
    .clearCookie("refreshToken" ,options)
    .json(new ApiResponse(200 , {} , "user logout sucessfully"))
})


const ValidatedToken = asyncHandler(async (req , res)=>{
     
    const user = {
        _id : req.user._id,
        email:req.user.email,
        name:req.user.name,
    }
    res.status(200)
    .json(new ApiResponse (200 , user , "user validated" ))
})


export{registerUser , loginUser , logoutUser ,adminLogin , adminlogout , ValidatedToken}