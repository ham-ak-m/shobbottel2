const mongoose = require('mongoose');
const { productSchema } = require('./product');

const schema = new mongoose.Schema({
    telId: Number,
    first_name: String,
    username: String,
    fav: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    buys: [productSchema]
});
module.exports = mongoose.model("user", schema);