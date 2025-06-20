const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
    } ,
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
        trim : true,
    }, 
    otp : {
        type : String,
        trim : true,
    },
    isVerfied : {
        type : Boolean,
        default : false,
    },

})

module.exports = mongoose.model("Users" , userSchema);