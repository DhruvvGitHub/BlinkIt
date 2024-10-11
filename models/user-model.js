const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Address Schema with validation
const addressSchema = mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: {
    type: Number,
    required: true,
    min: 10000,
    max: 99999,
  },
});

// Mongoose User Schema with validation
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: { type: String },
    phone: {
      type: String, // Change type to String for regex to work correctly
      required: true,
      match: /^\d{10}$/, // Using match for 10-digit validation
    },
    addresses: { type: [addressSchema], required: true },
  },
  { timestamps: true }
);

// Joi Validation Schema for User Input
const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required(), // Phone should be a string of 10 digits
    addresses: Joi.array()
      .items(
        Joi.object({
          address: Joi.string().required(),
          city: Joi.string().required(),
          state: Joi.string().required(),
          zip: Joi.string()
            .pattern(/^\d{5}$/)
            .required(), // Zip code as a string of 5 digits
        })
      )
      .min(1)
      .required(),
  });

  return schema.validate(user);
};

module.exports = {
  userModel: mongoose.model("user", userSchema),
  validateUser,
};
