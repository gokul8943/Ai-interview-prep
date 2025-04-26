import { Router } from "express";
import { InterviewRepositoryImpl } from "../repositories/InterviewRepositoryImpl";
import { CreateInterview } from "../../usecase/Interview/CreateInterview";
import { GetInterview } from "../../usecase/Interview/GetInterview";
import { InterviewController } from "../controllers/InterviewController";
import interviewModel from "../../framework/models/interviewModel";

const interviewRepository = new InterviewRepositoryImpl(interviewModel);
const createInterview = new CreateInterview(interviewRepository);
const getInterview = new GetInterview(interviewRepository);
const interviewController = new InterviewController( createInterview, getInterview);

const router = Router();


router.post('/create-interview', async (req, res) => {
    try {
        interviewController.createInterview(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})

router.get('/get-interviews', async (req, res) => { 
    try {
        interviewController.getInterviews(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})