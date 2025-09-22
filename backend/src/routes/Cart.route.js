
import express, { Router } from "express"
import verifyuser from "../middleware/verifyUser.js"
import { addToCart, deletecart, getCart, updateQuantity } from "../controller/Cart.controller.js"



const cartRoute = Router()




cartRoute.route("/add").post(verifyuser,addToCart)
cartRoute.route("/getcart").get(verifyuser,getCart)
cartRoute.route("/:productId").delete(verifyuser,deletecart)
cartRoute.route("/:productId").put(verifyuser,updateQuantity)


console.log('Cart routes defined')


export default cartRoute