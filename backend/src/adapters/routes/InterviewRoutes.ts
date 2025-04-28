import { Router } from "express";
import { InterviewRepositoryImpl } from "../repositories/InterviewRepositoryImpl";
import { CreateInterview } from "../../usecase/Interview/CreateInterview";
import { GetInterview } from "../../usecase/Interview/GetInterview";
import { GetInterviewById } from "../../usecase/Interview/GetInterviewById";
import { DeleteInterview } from "../../usecase/Interview/DeleteInterview"
import { InterviewController } from "../controllers/InterviewController";
import interviewModel from "../../framework/models/interviewModel";
;


const interviewRepository = new InterviewRepositoryImpl(interviewModel);
const createInterview = new CreateInterview(interviewRepository);
const getInterview = new GetInterview(interviewRepository);
const getInterviewById = new GetInterviewById(interviewRepository);
const deleteInterview = new DeleteInterview(interviewRepository);
const interviewController = new InterviewController( createInterview, getInterview,getInterviewById,deleteInterview);

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
router.get('/get-interviews/:id', async (req, res) => { 
    try {
        interviewController.getInterviewById(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})

router.post('/delete-interview/:id',async (req,res) =>{
    try {
        interviewController.deleteInterview(req,res)
    } catch (error) {
        res.status(500).json({message:"error in routes",error})
    }
})