import { Router } from "express";
import { adminLogin, adminlogout, loginUser, logoutUser, registerUser, ValidatedToken } from "../controller/user.controller.js";
import verifyuser from "../middleware/verifyUser.js";


const Userrouter = Router()


Userrouter.route("/registerUser").post(registerUser)
Userrouter.route("/loginUser").post(loginUser)
Userrouter.route("/logoutUser").post(logoutUser)
Userrouter.route("/validate").get(verifyuser,ValidatedToken)
Userrouter.route("/admin").post(adminLogin)
Userrouter.route("/adminlogout").post(adminlogout)


export default Userrouter
