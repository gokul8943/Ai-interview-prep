import { Router } from "express";
import { FeedbackRepositoryImpl } from "../repositories/FeedbackRepositoryImpl";
import { CreateFeedback } from "../../usecase/Feedback/CreateFeedback";
import { GetFeedback } from "../../usecase/Feedback/GetFeedback";
import { GetFeedbackById } from "../../usecase/Feedback/GetFeedbackById";
import { DeleteFeedback } from "../../usecase/Feedback/DeleteFeedback";
import { FeedbackController } from "../controllers/FeedbackController";
import feedbackModel from "../../framework/models/feedbackModel"
import { authMiddleware } from "../middleware/userAuth";

const feedbackRepository = new FeedbackRepositoryImpl(feedbackModel);
const createFeedback = new CreateFeedback(feedbackRepository);
const getFeedback = new GetFeedback(feedbackRepository);
const getFeedbackById = new GetFeedbackById(feedbackRepository);
const deleteFeedback = new DeleteFeedback(feedbackRepository);
const feedbackController = new FeedbackController(createFeedback, getFeedback, getFeedbackById, deleteFeedback);

const router = Router();


router.post('/create', authMiddleware, feedbackController.createFeedback.bind(feedbackController))

router.get('/get', authMiddleware, feedbackController.getFeedback.bind(feedbackController))

router.get('/get/:id', authMiddleware, feedbackController.getFeedbackById.bind(feedbackController))

router.post('/delete/:id', authMiddleware, feedbackController.deleteFeedback.bind(feedbackController))
export default router