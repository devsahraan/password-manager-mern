const userValidation = require("../validation/userValidations");
const userModel = require("../model/usersModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const usersModel = require("../model/usersModel");
const postMode = require("../model/postMode");

exports.RegisterController = async (req , res) =>{
    try{
        await userValidation.userRegisterValidation.validateAsync(req.body);
        // If validation passes, proceed with registration logic
        const {username , email , password} = req.body;
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).send({
                message : "User already exists with this email",
                status : "failed"
            })
        } else{
            let otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.otp = otp;
            req.body.password = hashedPassword;
            const newUser = userModel(req.body);
            const saveUser = await newUser.save();
            if(saveUser){
                const transporter = nodemailer.createTransport({
                    service : "gmail",
                    auth : {
                        user: process.env.smtpemail,
                        pass: process.env.smtppass
                    },
                    tls:{
                        rejectUnauthorized: false
                    }
                })

                const info = {
                    from : process.env.smtpemail,
                    to : saveUser.email,
                    subject : "OTP for registration",
                    text : `Your OTP for registration is ${otp}. Please use this to complete your registration.`
                }

                transporter.sendMail(info , (error , info) => {
                    if(error){
                        console.log(error);
                    }
                })
                return res.send({
                    message : "OTP sent successfully",
                    user : {
                        username : saveUser.username,
                        email : saveUser.email,
                    }
                })
            }


        }
        
    } catch(error){
        res.send({
            message: "Validation failed",
            error: error.details ? error.details[0].message : error.message
        })
    }
}

exports.resendOtpController = async (req , res) => {
    const {email} = req.body;

    const existUser = await userModel.findOne({email});

    if(existUser){
        let otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        existUser.otp = otp;
        await existUser.save();

        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : process.env.smtpemail,
                pass : process.env.smtppass
            },
            tls:{
                rejectUnauthorized : false
            }
        })

        const info = {
            from : process.env.smtpemail,
            to : existUser.email,
            subject : "Forget Password OTP",
            text : `Your OTP to Change Password is ${otp}. Please use this to complete your registration.`
        }
        transporter.sendMail(info , (error , info) => {
            if(error){
                console.log(error);
            }
        })

        return res.send({
            message : "OTP sent successfully"
        })
    } else{
        return res.status(400).send({
            message : "User not found with this email",
            status : "failed"
        })
    }

}

exports.verifyOtpController =async (req , res) => {
    const {email,otp} = req.body;

    const existUser = await userModel.findOne({email});

    if(existUser){
        if(existUser.otp === otp){
            existUser.isVerfied = true;
            existUser.otp = "";
           await existUser.save();
            return res.send({
                message : "Registration successful",
                user : {
                    username : existUser.username,
                    email : existUser.email
                }
            })
        } else {
            return res.status(400).send({
                message : "Invalid OTP",
                status : "failed"
            })
        }
    } else {
        return res.status(400).send({
            message : "User not found with this email",
            status : "failed"
        })
    }
}

exports.LoginController = async(req , res) => {

    const {email , password} = req.body;

    if(email != "" && password != ""){
        const existUser = await usersModel.findOne({email});

        if(existUser){
            if(existUser.isVerfied){
                const isValid = await bcrypt.compare(password , existUser.password);

                if(isValid){
                    res.send({
                        message : "Login Success",
                        user : existUser
                    })
                } else{
                    res.status(400).send({
                        message : "Incorrect Password",
                        status : "failed"
                    })
                }
            } else{
                res.status(400).send({
                        message : "User Not Verified",
                        status : "notverified"
                    })
            }
        } else {
            res.status(400).send({
                message : "No User Found",
                status : "failed"
            })
        }
    }
}

exports.ForgetPassController = async (req , res) =>{
    const {email} = req.body;

    const existUser = await userModel.findOne({email});

    if(existUser){
        
        let otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        existUser.otp = otp;
        await existUser.save();

        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : process.env.smtpemail,
                pass : process.env.smtppass
            },
            tls:{
                rejectUnauthorized : false
            }
        })

        const info = {
            from : process.env.smtpemail,
            to : existUser.email,
            subject : "Forget Password OTP",
            text : `Your OTP to Change Password is ${otp}. Please use this to complete your registration.`
        }
        transporter.sendMail(info , (error , info) => {
            if(error){
                console.log(error);
            }
        })

        res.send({
            message : "OTP sent successfully"

        })
    } else {
        res.status(400).send({
            message : "No User Found",
            status : "failed"
        })
    }
}

exports.NewPasswordController = async(req,res) =>{
    const {email , password} = req.body;

    const existUser = await userModel.findOne({email});

    if(existUser){
        const hashedPassword = await bcrypt.hash(password , 10);
        existUser.password = hashedPassword;
        await existUser.save();

        res.send({
            message : "Password Changed"
        })
    } else{
        res.status.send({
            message : "No User Found",
            status : "failed"
        })
    }
}

exports.AddPostController = async(req , res) =>{
    let newPost = postMode(req.body);

    let savePost = await newPost.save();

    if(savePost){
        res.send({
            message : "post saved"
        })
    }
}

exports.GetPostsController= async (req , res) =>{
    const userId = req.body.userId;
    const posts = await postMode.find({ uid: userId }).sort({ createdAt: -1 });

    if(posts.length > 0){
        res.send({
            message: "Posts fetched successfully",
            posts: posts
        })
    } else {
        res.status(404).send({
            message: "No posts found for this user",
            status: "notfound"
        })
    }
}