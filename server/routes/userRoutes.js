const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register" ,userController.RegisterController);
router.post("/resendotp" ,userController.resendOtpController);
router.post("/verifyotp" ,userController.verifyOtpController);
router.post("/login" , userController.LoginController);
router.post("/forgetpassword" , userController.ForgetPassController);
router.post("/newpassword" , userController.NewPasswordController);
router.post("/addPost" , userController.AddPostController);
router.post("/getPosts" , userController.GetPostsController);

module.exports = router;