
import express, { Router } from "express"
import verifyuser from "../middleware/verifyUser.js"
import { addToCart } from "../controller/Cart.controller.js"



const cartRoute = Router()




cartRoute.route("/add").post(verifyuser,addToCart)


export default cartRoute