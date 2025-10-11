import { Router } from "express";
import { InterviewRepositoryImpl } from "../repositories/InterviewRepositoryImpl";
import { CreateInterview } from "../../usecase/Interview/CreateInterview";
import { GetInterview } from "../../usecase/Interview/GetInterview";
import { GetInterviewQuestionsById } from "../../usecase/Interview/GetInterviewQuestionsById";
import { DeleteInterview } from "../../usecase/Interview/DeleteInterview"
import { SaveAnswer } from "../../usecase/Interview/SaveAnswer";
import { GetSummary } from "../../usecase/Interview/GetSummary";
import { GenerateSummary } from "../../usecase/Interview/GenerateSummary";
import { InterviewController } from "../controllers/InterviewController";

import interviewModel from "../../framework/models/interviewModel";
import questiomModel from "../../framework/models/questionModel";
import summaryModel from "../../framework/models/summaryModel";


const interviewRepository = new InterviewRepositoryImpl(interviewModel,questiomModel,summaryModel);
const createInterview = new CreateInterview(interviewRepository);
const getInterview = new GetInterview(interviewRepository);
const getInterviewQuestionsById = new GetInterviewQuestionsById(interviewRepository);
const deleteInterview = new DeleteInterview(interviewRepository);
const saveAnswer = new SaveAnswer(interviewRepository);
const generateSummary = new GenerateSummary(interviewRepository);
const getSummary = new GetSummary(interviewRepository);
const interviewController = new InterviewController( createInterview, getInterview,getInterviewQuestionsById,deleteInterview,saveAnswer,getSummary,generateSummary);

const router = Router();


router.post('/create', async (req, res) => {
    try {
        interviewController.createInterview(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})

router.get('/get', async (req, res) => { 
    try {
        interviewController.getInterview(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})
router.get('/get-question/:id', async (req, res) => { 
    try {
        interviewController.getInterviewQuestionsById(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})

router.post('/delete/:id',async (req,res) =>{
    try {
        interviewController.deleteInterview(req,res)
    } catch (error) {
        res.status(500).json({message:"error in routes",error})
    }
})

router.post('/save-answer/:id',async (req,res) =>{
    try {
        interviewController.saveAnswer(req,res)
    } catch (error) {
        res.status(500).json({message:"error in routes",error})
    }
})
router.post('/generate-summary/:interviewId',async(req,res)=>{
    try {
        interviewController.generateSummary(req,res)
    } catch (error) {
        res.status(500).json({message:"error in routes",error})
    }
})

router.post('/get-summary',async(req,res)=>{
    try {
        interviewController.getSummary(req,res)
    } catch (error) {
        res.status(500).json({message:"error in routes",error})
    }
})


export default router