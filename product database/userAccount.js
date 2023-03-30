const mongoose = require('mongoose');

const userAccount = new mongoose.Schema({
 
    username : String,
    order : String,
    email : {
        type: String,
        trim: true,
        lowercase: true,
    },
    address : String

})

module.exports = mongoose.model('Useraccount',userAccount);