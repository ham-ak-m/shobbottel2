const mongoose = require("mongoose");
const { productSchema } = require("./product");

const schema = new mongoose.Schema({
  telId: Number,
  first_name: String,
  username: String,
  fav: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      shareUse: Boolean,
    },
  ],
  buys: [productSchema],
});
const User = mongoose.model("user", schema);
module.exports = User;

module.exports.createUser = async (userTel, saveUser = true) => {
  const user = new User({
    telId: userTel.id,
    first_name: userTel.first_name,
    username: userTel.username,
  });
  if (saveUser) await user.save();
  return user;
};
