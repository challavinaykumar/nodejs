
const db = require("../Model/ProductDb");


exports.createProduct = async (req,res) => {

    const {title,image,price,category} = req.body

    const data = await db.create({title,price,category,image})

    res.status(200).json({message:"succefully product crreated",data})
}