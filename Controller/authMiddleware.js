const db = require("../Model/loginDb");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;

  let decoded = jwt.verify(token, process.env.secretKey);

  let userData = await db.findById(decoded.id).select("-password")

  if(!userData){
    res.json({message:"user not existed"})
  }

  req.userDetail = userData
 
  next();
};
