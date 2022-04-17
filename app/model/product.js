const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    photo: String,
    price: Number,
    exist: Boolean,
    meta: [],
    cat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
});
module.exports = mongoose.model("product", schema);
module.exports.productSchema = schema;