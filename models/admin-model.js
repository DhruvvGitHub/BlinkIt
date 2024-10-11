const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Admin Schema with validation
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3, // Minimum length for the name
        maxlength: 50 // Maximum length for the name
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'superadmin'], // Assuming there are specific roles
    }
}, { timestamps: true });

// Joi Validation Schema for Admin Input
const validateAdmin = (admin) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'superadmin').required() // Validating against allowed roles
    });

    return schema.validate(admin);
};

module.exports = {
    adminModel: mongoose.model("admin", adminSchema),
    validateAdmin,
};