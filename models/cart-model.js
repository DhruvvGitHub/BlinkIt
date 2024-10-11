const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Cart Schema with validation
const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true // Ensure a user is associated with the cart
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true // Ensure at least one product is in the cart
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0 // Ensure the total price is non-negative
    }
}, { timestamps: true });

// Joi Validation Schema for Cart Input
const validateCart = (cart) => {
    const schema = Joi.object({
        user: Joi.string().required(), // Validate user ID as a string
        products: Joi.array()
            .items(Joi.string().required())
            .min(1) // Ensure at least one product is required
            .required(),
        totalPrice: Joi.number().min(0).required() // Validate totalPrice to be a non-negative number
    });

    return schema.validate(cart);
};

module.exports = {
    cartModel: mongoose.model("cart", cartSchema),
    validateCart,
};
