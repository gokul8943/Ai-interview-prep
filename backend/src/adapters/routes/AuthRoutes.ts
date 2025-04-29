import { Router } from "express";
import { AuthRepositoryImpl } from "../repositories/AuthRepositoryImpl";
import { AuthController } from "../controllers/AuthController";
import { SignUp } from "../../usecase/Auth/SignUp";
import userModel from "../../framework/models/userModel";
import { Login } from "../../usecase/Auth/Login";
import { verify } from "crypto";
import { VerifyOtp } from "../../usecase/Auth/VerifyOtp";
import { GenerateOtp } from "../../usecase/Auth/GenerateOtp";
import otpRepository from "../../framework/models/otpModel";


const authRepository = new AuthRepositoryImpl(userModel)
const signUp = new SignUp(authRepository);
const login = new Login(authRepository);
const generateOtp = new GenerateOtp(otpRepository);
const verifyOtp = new VerifyOtp(otpRepository);
const authController = new AuthController(signUp, login,generateOtp,verifyOtp)

const router = Router();

router.post('/sign-up', async (req, res) => {
    try {
        authController.signUp(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})
router.post('/sign-in', async(req, res) =>{
    try {
        authController.login(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error  })
    }
});
router.post('verify-otp', async (req, res) => {
    try {
        authController.verifyOtp(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})


export default router;