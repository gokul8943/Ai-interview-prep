import { Router } from "express";
import { InterviewRepositoryImpl } from "../repositories/InterviewRepositoryImpl";
import { CreateInterview } from "../../usecase/Interview/CreateInterview";
import { InterviewController } from "../controllers/InterviewController";
import interviewModel from "../../framework/models/interviewModel";

const interviewRepository = new InterviewRepositoryImpl(interviewModel);
const createInterview = new CreateInterview(interviewRepository);
const interviewController = new InterviewController(createInterview);

const router = Router();


router.post('/create-interview', async (req, res) => {
    try {
        interviewController.createInterview(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})