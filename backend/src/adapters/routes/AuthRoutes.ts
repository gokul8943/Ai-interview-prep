import { Router } from "express";
import { AuthRepositoryImpl } from "../repositories/AuthRepositoryImpl";
import { AuthController } from "../controllers/AuthController";
import { SignUp } from "../../usecase/Auth/SignUp";
import userModel from "../../framework/models/userModel";


const authRepository = new AuthRepositoryImpl(userModel)
const signUpUseCase = new SignUp(authRepository)
const authController = new AuthController(signUpUseCase)

const router = Router();

router.post("/sign-up", authController.signUp);

export default router;