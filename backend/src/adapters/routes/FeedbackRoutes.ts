import { Router } from "express";
import { FeedbackRepositoryImpl } from "../repositories/FeedbackRepositoryImpl";
import { CreateFeedback } from "../../usecase/Feedback/CreateFeedback";
import { GetFeedback } from "../../usecase/Feedback/GetFeedback";
import { GetFeedbackById } from "../../usecase/Feedback/GetFeedbackById";
import { DeleteFeedback } from "../../usecase/Feedback/DeleteFeedback";
import { FeedbackController } from "../controllers/FeedbackController";
import feedbackModel from "../../framework/models/feedbackModel"

const feedbackRepository = new FeedbackRepositoryImpl(feedbackModel);
const createFeedback = new CreateFeedback(feedbackRepository);
const getFeedback = new GetFeedback(feedbackRepository);
const getFeedbackById = new GetFeedbackById(feedbackRepository);
const deleteFeedback = new DeleteFeedback(feedbackRepository);
const feedbackController = new FeedbackController(createFeedback, getFeedback, getFeedbackById, deleteFeedback);

const router = Router();

router.post('/create', async (req, res) => {
    try {
        feedbackController.createFeedback(req, res)
    } catch (error) {
        res.status(500).json({ message: "error in routes", error })
    }
})

router.get('/get', async (req, res) => {
    try {
        feedbackController.getFeedback(req, res)
    } catch (error) {
        res.status(500).json({ message: "error in routes", error })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        feedbackController.getFeedbackById(req, res)
    } catch (error) {
        res.status(500).json({ message: "error in routes", error })
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        feedbackController.deleteFeedback(req, res)
    } catch (error) {
        res.status(500).json({ message: "error in routes", error })
    }
})