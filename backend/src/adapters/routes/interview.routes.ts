import { Router } from "express";
import { InterviewRepositoryImpl } from "../repositories/interview.repositoryImpl";
import { CreateInterview } from "../../usecase/Interview/createInterview";
import { GetInterview } from "../../usecase/Interview/getInterview";
import { GetInterviewQuestionsById } from "../../usecase/Interview/getInterviewQuestionsById";
import { DeleteInterview } from "../../usecase/Interview/deleteInterview"
import { SaveAnswer } from "../../usecase/Interview/saveAnswer";
import { GetSummary } from "../../usecase/Interview/getSummary";
import { GenerateSummary } from "../../usecase/Interview/generateSummary";
import { GetInterviewByUserId } from "../../usecase/Interview/getInterviewByUserId";
import { InterviewController } from "../controllers/interview.controller";

import interviewModel from "../../framework/models/interview.model";
import questiomModel from "../../framework/models/question.model";
import summaryModel from "../../framework/models/summary.model";
import userModel from "../../framework/models/user.model";

import { authMiddleware } from "../middleware/authMiddleware";
import { asyncHandler } from "../../utils/asyncHandler";


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

router.post('/v1/create', authMiddleware, asyncHandler((req, res) => interviewController.createInterview(req, res)))

router.get('/v1/get', authMiddleware, asyncHandler((req, res) => interviewController.getInterview(req, res)))

router.get('/v1/get-question/:id', authMiddleware, asyncHandler((req, res) => interviewController.getInterviewQuestionsById(req, res)))

router.post('/v1/delete/:id', authMiddleware, asyncHandler((req, res) => interviewController.deleteInterview(req, res)))

router.post('/v1/save-answer/:id', authMiddleware, asyncHandler((req, res) => interviewController.saveAnswer(req, res)))

router.post('/v1/generate-summary/:interviewId', authMiddleware, asyncHandler((req, res) => interviewController.generateSummary(req, res)))

router.get('/v1/get-summary/:interviewId', authMiddleware, asyncHandler((req, res) => interviewController.getSummary(req, res)))

router.get('/v1/get-by-user/:userId', authMiddleware, asyncHandler((req, res) => interviewController.getInterviewByUserId(req, res)))

export default router
