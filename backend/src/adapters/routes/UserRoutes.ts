import { Router } from "express";
import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { GetUserInterview } from "../../usecase/User/GetUserInterview";
import { UserController } from "../controllers/UserController";
import userModel from "../../framework/models/userModel";
import interviewModel from "../../framework/models/interviewModel";
import { authMiddleware } from "../middleware/userAuth";

const userRepository = new UserRepositoryImpl(userModel, interviewModel);
const getUserInterview = new GetUserInterview(userRepository);
const userController = new UserController(getUserInterview);
const router = Router();

router.get('/interviews/:userId', authMiddleware, userController.getUserInterviews.bind(userController));



export default router