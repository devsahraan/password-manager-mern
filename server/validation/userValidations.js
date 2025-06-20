const joi = require("joi");

 const userRegisterValidation = joi.object({
    username : joi.string().required().messages({
        "string.base" : "username must be a string",
        "string.empty" : "username cannot be empty",
        "any.required" : "username is required"
    }),
    email : joi.string().email().required().messages({
        "string.email" : "email must be a valid email address",
        "string.empty" : "email cannot be empty",
        "any.required" : "email is required"
    }),
    password : joi.string().min(6).max(20).required().messages({
        "string.base" : "password must be a string",
        "string.empty" : "password cannot be empty",
        "string.min" : "password must be at least 6 characters long",
        "string.max" : "password must not exceed 20 characters",
        "any.required" : "password is required"
    })
})

module.exports = {
    userRegisterValidation
};