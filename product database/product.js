const mongoose = require('mongoose');

const listOfProduct = new mongoose.Schema({
    name: String,
    price: Number,
    category:['electornics','furniture','homeEssentials','babyCare'],
    description:String,
    rating: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
       }]
  });

  const Product = mongoose.model('Product', listOfProduct );

module.exports = Product;