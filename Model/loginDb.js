const mongoose = require("mongoose");

const details =new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  role:{
    type:String,
    enum:["admin","user","manager"],
    default:"user"
  }
});

module.exports = mongoose.model("userDetail", details);
