/** @format */

const Cart = require("../Model/Cartdb");

exports.addToCart = async (req, res) => {
  const id = req.userDetail.id;

  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: id });

  if (!cart) {
    cart = new Cart({
      user: id,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex((item) => item.product === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  res.status(200).json({
    message: "product added to cartg",
    cart,
  });
};

exports.getCart = async (req, res) => {
  const id = req.userDetail.id;

  const cart = await Cart.findOne({
    user: id,
  })
    .populate("user", "name email")
    .populate("items.product", "title image price");

  res.json(cart);
};
