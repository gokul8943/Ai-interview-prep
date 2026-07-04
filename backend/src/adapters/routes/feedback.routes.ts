import { Router } from "express";
import { FeedbackRepositoryImpl } from "../repositories/feedback.repositoryImpl";
import { CreateFeedback } from "../../usecase/Feedback/createFeedback";
import { GetFeedback } from "../../usecase/Feedback/getFeedback";
import { GetFeedbackById } from "../../usecase/Feedback/getFeedbackById";
import { DeleteFeedback } from "../../usecase/Feedback/deleteFeedback";
import { FeedbackController } from "../controllers/feedback.controller";
import feedbackModel from "../../framework/models/feedback.model"
import { authMiddleware } from "../middleware/userAuth";

const feedbackRepository = new FeedbackRepositoryImpl(feedbackModel);
const createFeedback = new CreateFeedback(feedbackRepository);
const getFeedback = new GetFeedback(feedbackRepository);
const getFeedbackById = new GetFeedbackById(feedbackRepository);
const deleteFeedback = new DeleteFeedback(feedbackRepository);
const feedbackController = new FeedbackController(createFeedback, getFeedback, getFeedbackById, deleteFeedback);

const router = Router();


router.post('/v1/create', authMiddleware, feedbackController.createFeedback.bind(feedbackController))

router.get('/v1/get', authMiddleware, feedbackController.getFeedback.bind(feedbackController))

router.get('/v1/get/:id', authMiddleware, feedbackController.getFeedbackById.bind(feedbackController))

router.post('/v1/delete/:id', authMiddleware, feedbackController.deleteFeedback.bind(feedbackController))
export default router