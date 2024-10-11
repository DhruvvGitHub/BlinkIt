const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    },
    amount: String,
    method: String,
    status: String,
    transactionID: String
})

module.exports = mongoose.model("payment", paymentSchema)
