const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    uid : {
        type : String,
        required : true,
        trim : true,
    } ,
    username : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
    }, 
    password : {
        type : String,
        trim : true,
        required : true
    },
    Date : {
        type : Date,
        default : Date(),
    },

})

module.exports = mongoose.model("Posts" , postSchema);