const mongoose = require("mongoose");

let details = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  image: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("product", details);
 