import { Router } from "express";
import { UserRepositoryImpl } from "../repositories/user.repositoryImpl";
import { GetUserInterview } from "../../usecase/User/getUserInterview";
import { UserController } from "../controllers/user.controller";
import userModel from "../../framework/models/user.model";
import interviewModel from "../../framework/models/interview.model";
import { authMiddleware } from "../middleware/authMiddleware";
import { asyncHandler } from "../../utils/asyncHandler";

const userRepository = new UserRepositoryImpl(userModel, interviewModel);
const getUserInterview = new GetUserInterview(userRepository);
const userController = new UserController(getUserInterview);
const router = Router();

router.get('/v1/interviews/:userId', authMiddleware, asyncHandler((req, res) => userController.getUserInterviews(req, res)));



export default router