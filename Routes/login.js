const express = require("express")
const { signup, login, profile, addrees, forgetPassword, resetPassword } = require("../Controller/loginController")
const { authMiddleware } = require("../Controller/authMiddleware")

const route = express.Router()

route.post("/signup",signup)
route.post("/login",login)
route.get("/profile",authMiddleware,profile)
route.get("/address",authMiddleware,addrees)
route.post("/forgetpassword",authMiddleware ,forgetPassword)
route.get("/resetpassword/:email",resetPassword)


module.exports = route