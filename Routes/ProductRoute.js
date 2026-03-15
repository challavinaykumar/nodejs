const express = require("express")
const { authMiddleware } = require("../Controller/authMiddleware")
const { authorize } = require("../Controller/authorize")
const { createProduct } = require("../Controller/ProductController")
const { addToCart, getCart } = require("../Controller/CartController")

const route = express.Router()

route.post("/createProduct",authMiddleware,authorize("admin","manager"),createProduct)
route.delete("/deleteProduct",authMiddleware,authorize("admin"))
route.post("/addToCart",authMiddleware,addToCart)
route.get("/getCart",authMiddleware,getCart)


module.exports = route