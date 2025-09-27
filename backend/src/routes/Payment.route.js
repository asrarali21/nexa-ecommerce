import { Router } from "express";
import verifyuser from "../middleware/verifyUser.js";
import { CreateOrderRazorpay } from "../controller/payment.controller.js";


const paymentRouter = Router()



paymentRouter.route("/Create-Order").post(verifyuser , CreateOrderRazorpay )


export default paymentRouter