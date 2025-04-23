import { Router } from "express";
import { AuthRepositoryImpl } from "../repositories/AuthRepositoryImpl";
import { AuthController } from "../controllers/AuthController";
import { SignUp } from "../../usecase/Auth/SignUp";
import userModel from "../../framework/models/userModel";
import { Login } from "../../usecase/Auth/Login";


const authRepository = new AuthRepositoryImpl(userModel)
const signUp = new SignUp(authRepository);
const login = new Login(authRepository);
const authController = new AuthController(signUp, login)

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
        authController.Login(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error  })
    }
});


export default router;