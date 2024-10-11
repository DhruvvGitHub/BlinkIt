const mongoose = require('mongoose');
const Joi = require('joi');


// Mongoose Payment Schema with validation
const paymentSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true // Ensure an order is associated with the payment
    },
    amount: {
        type: String,
        required: true // Ensure an amount is provided
    },
    method: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true, // Ensure status is specified
    },
    transactionID: {
        type: String,
        required: true, // Ensure a transaction ID is provided
        unique: true
    }
}, { timestamps: true });

// Joi Validation Schema for Payment Input
const validatePayment = (payment) => {
    const schema = Joi.object({
        order: Joi.string().required(), // Validate order ID as a required string
        amount: Joi.string().required(), // Validate amount as a required string
        method: Joi.string().required(), // Validate method against enum values
        status: Joi.string().required(), // Validate that status is required
        transactionID: Joi.string().required() // Validate transaction ID as a required string
    });

    return schema.validate(payment);
};

module.exports = {
    paymentModel: mongoose.model("payment", paymentSchema),
    validatePayment,
};