const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: String,
    category: String,
    inStock: Boolean,

})

module.exports = mongoose.model("product", productSchema)