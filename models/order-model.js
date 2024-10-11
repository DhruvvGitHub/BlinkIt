const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Order Schema with validation
const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true // Ensure a user is associated with the order
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true // Ensure at least one product is included in the order
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0 // Ensure the total price is non-negative
    },
    address: {
        type: String,
        required: true, // Ensure an address is provided
        minlength: 5, // Minimum length for the address
        maxlength: 200 // Maximum length for the address
    },
    status: {
        type: String,
        required: true, // Ensure the order status is specified
        status: ["pending", "processing", "shipped", "cancelled", "delivered"]
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment",
        required: true // Ensure a payment reference is included
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delivery",
        required: true // Ensure a delivery reference is included
    }
}, { timestamps: true });

// Joi Validation Schema for Order Input
const validateOrder = (order) => {
    const schema = Joi.object({
        user: Joi.string().required(), // Validate user ID as a required string
        products: Joi.array()
            .items(Joi.string().required())
            .min(1) // Ensure at least one product is required
            .required(),
        totalPrice: Joi.number().min(0).required(), // Validate totalPrice to be a non-negative number
        address: Joi.string().min(5).max(200).required(), // Validate address length and requirement
        status: Joi.string().valid("pending", "processing", "shipped", "cancelled", "delivered").required(), // Validate that status is required
        payment: Joi.string().required(), // Validate payment ID as a required string
        delivery: Joi.string().required() // Validate delivery ID as a required string
    });

    return schema.validate(order);
};

module.exports = {
    orderModel: mongoose.model("order", orderSchema),
    validateOrder,
};
