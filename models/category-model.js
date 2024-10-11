const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Category Schema with validation
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3, 
        maxlength: 50 
    }
}, { timestamps: true });

// Joi Validation Schema for Category Input
const validateCategory = (category) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required() // Validate category name length and requirement
    });

    return schema.validate(category);
};

module.exports = {
    categoryModel: mongoose.model("category", categorySchema),
    validateCategory,
};