
import express, { Router } from "express"
import verifyuser from "../middleware/verifyUser.js"
import { addToCart, getCart } from "../controller/Cart.controller.js"



const cartRoute = Router()




cartRoute.route("/add").post(verifyuser,addToCart)
cartRoute.route("/getcart").get(verifyuser,getCart)


console.log('Cart routes defined')


export default cartRoute