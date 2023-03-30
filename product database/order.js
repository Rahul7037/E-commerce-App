const mongoose = require('mongoose');

const oder = new mongoose.Schema({
    item : {
        name : [String],
        price : [Number]
    },
    amount : Number,
    oderId : String,
    paymentStatus : String,
    x : Number
})

module.exports = mongoose.model('Oder',oder)