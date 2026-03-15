const express = require("express")
require("dotenv").config()
const loginRoutes = require('./Routes/login')
const db = require("mongoose")
const cors = require("cors")
const productRoutes = require("./Routes/ProductRoute")

const app = express()

app.use((req,res)=>{
    res.send("hello world")
})
app.use(express.json())
app.use(cors())
db.connect(process.env.mongo_url)

app.use(loginRoutes)
app.use(productRoutes)


let port = process.env.PORT

app.listen(port || 5000,()=>{
    console.log(`server started ${port}`)
})

//admin, manager,user

//all usedetails ,create product,delete create ,, view of products & purchase of products