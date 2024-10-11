const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("connected to Mongo");
})

module.exports = mongoose.connection