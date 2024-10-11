const mongoose = require('mongoose');
const Joi = require('joi');


// Mongoose Product Schema with validation
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensure a name is provided
        minlength: 2, // Minimum length for the name
        maxlength: 100 // Maximum length for the name
    },
    description: {
        type: String,
        required: true, // Ensure a description is provided
    },
    image: {
        type: String,
    },
    price: {
        type: String,
        required: true // Ensure a price is provided
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Boolean,
        required: true // Ensure inStock status is provided
    }
}, { timestamps: true });

// Joi Validation Schema for Product Input
const validateProduct = (product) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(), // Validate name length and requirement
        description: Joi.string().required(), // Validate description length and requirement
        image: Joi.string().uri().required(), // Validate image URL as a required URI
        price: Joi.string().required(),
        category: Joi.string().required(), // Validate category against enum values
        inStock: Joi.boolean().required() // Validate that inStock is required
    });

    return schema.validate(product);
};

module.exports = {
    productModel: mongoose.model("product", productSchema),
    validateProduct,
};