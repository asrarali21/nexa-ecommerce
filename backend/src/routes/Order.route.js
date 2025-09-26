import { Router } from "express";
import verifyuser from "../middleware/verifyUser.js";
import { createOrder } from "../controller/Order.controller.js";



const orderRouter = Router()



orderRouter.route("/CreateOrder").post(verifyuser , createOrder)

export default orderRouter