const mongoose = require('mongoose');

const userCart = new mongoose.Schema({
 items : String,
 quantity : Number,
 price : Number
})

module.exports = mongoose.model('Cart',userCart);