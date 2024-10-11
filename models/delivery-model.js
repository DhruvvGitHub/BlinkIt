const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Delivery Schema with validation
const deliverySchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true // Ensure an order is associated with the delivery
    },
    deliveryBoy: {
        type: String,
        required: true, // Ensure a delivery boy is specified
        minlength: 3, // Minimum length for the delivery boy's name
        maxlength: 50 // Maximum length for the delivery boy's name
    },
    status: {
        type: String,
        required: true, // Ensure status is specified
        enum: ["pending", "in-transit", "cancelled", "delivered"]
    },
    trackingURL: {
        type: String,
        required: true,
    },
    estimatedDeliveryTime: {
        type: Number,
        required: true,
        min: 0 // Ensure the estimated delivery time is non-negative
    }
}, { timestamps: true });

// Joi Validation Schema for Delivery Input
const validateDelivery = (delivery) => {
    const schema = Joi.object({
        order: Joi.string().required(), // Validate order ID as a required string
        deliveryBoy: Joi.string().min(3).max(50).required(), // Validate delivery boy's name length and requirement
        status: Joi.string().valid("pending", "in-transit", "cancelled", "delivered").required(), // Validate that status is required
        trackingURL: Joi.string().url(), // Validate the tracking URL format
        estimatedDeliveryTime: Joi.number().min(0).required() // Validate estimated delivery time as a non-negative number
    });

    return schema.validate(delivery);
};

module.exports = {
    deliveryModel: mongoose.model("delivery", deliverySchema),
    validateDelivery,
};
