import { Router } from "express";
import { InterviewRepositoryImpl } from "../repositories/InterviewRepositoryImpl";
import { CreateInterview } from "../../usecase/Interview/CreateInterview";
import { GetInterview } from "../../usecase/Interview/GetInterview";
import { GetInterviewQuestionsById } from "../../usecase/Interview/GetInterviewQuestionsById";
import { DeleteInterview } from "../../usecase/Interview/DeleteInterview"
import { SaveAnswer } from "../../usecase/Interview/SaveAnswer";
import { GetSummary } from "../../usecase/Interview/GetSummary";
import { GenerateSummary } from "../../usecase/Interview/GenerateSummary";
import { GetInterviewByUserId } from "../../usecase/Interview/GetInterviewByUserId";
import { InterviewController } from "../controllers/InterviewController";

import interviewModel from "../../framework/models/interviewModel";
import questiomModel from "../../framework/models/questionModel";
import summaryModel from "../../framework/models/summaryModel";
import userModel from "../../framework/models/userModel";

import { authMiddleware } from "../middleware/userAuth";


const interviewRepository = new InterviewRepositoryImpl(interviewModel, questiomModel, summaryModel, userModel);
const createInterview = new CreateInterview(interviewRepository);
const getInterview = new GetInterview(interviewRepository);
const getInterviewQuestionsById = new GetInterviewQuestionsById(interviewRepository);
const deleteInterview = new DeleteInterview(interviewRepository);
const saveAnswer = new SaveAnswer(interviewRepository);
const generateSummary = new GenerateSummary(interviewRepository);
const getSummary = new GetSummary(interviewRepository);

const getInterviewByUserId = new GetInterviewByUserId(interviewRepository);
const interviewController = new InterviewController(createInterview, getInterview, getInterviewQuestionsById, deleteInterview, saveAnswer, getSummary, generateSummary, getInterviewByUserId);

const router = Router();

router.post('/v1/create', authMiddleware,   interviewController.createInterview.bind(interviewController))

router.get('/v1/get', authMiddleware, interviewController.getInterview.bind(interviewController))

router.get('/v1/get-question/:id', authMiddleware, interviewController.getInterviewQuestionsById.bind(interviewController))

router.post('/v1/delete/:id', authMiddleware, interviewController.deleteInterview.bind(interviewController))

router.post('/v1/save-answer/:id', authMiddleware, interviewController.saveAnswer.bind(interviewController))

router.post('/v1/generate-summary/:interviewId', authMiddleware, interviewController.generateSummary.bind(interviewController))

router.get('/v1/get-summary/:interviewId', authMiddleware, interviewController.getSummary.bind(interviewController))

router.get('/v1/get-by-user/:userId', authMiddleware, interviewController.getInterviewByUserId.bind(interviewController))

export default router