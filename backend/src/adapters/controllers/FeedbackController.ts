import { Request, Response } from "express";
import { createFeedback } from "../../usecase/Feedback/CreateFeedback";
import { deleteFeedback } from "../../usecase/Feedback/DeleteFeedback";
import { getFeedback } from "../../usecase/Feedback/GetFeedback";
import { getFeedbackById } from "../../usecase/Feedback/GetFeedbackById";

export class FeedbackController {
    constructor(
        private readonly createFeedbackUseCase: createFeedback,
        private readonly getFeedbackUseCase: getFeedback,
        private readonly getFeedbackByIdUseCase: getFeedbackById,
        private readonly deleteFeedbackUseCase: deleteFeedback
    ) { }

    async createFeedback(req: Request, res: Response) {
        try {
            const feedbackData = req.body;
            const feedback = await this.createFeedbackUseCase.execute(feedbackData);
            res.status(201).json({message:"Feedback created successfully",feedback});
        } catch (error) {
            res.status(500).json({ message: "Error in routes", error });
        }
    }

    async getFeedback(req: Request, res: Response) {
        try {
            const feedback = await this.getFeedbackUseCase.execute();
            res.status(200).json({message:"Feedback fetched successfully",feedback});
        } catch (error) {
            res.status(500).json({ message: "Error in routes", error });
        }
    }

    async getFeedbackById(req: Request, res: Response) {
        try {
            const feedbackId = req.params.id;
            const feedback = await this.getFeedbackByIdUseCase.execute(feedbackId);
            res.status(200).json({message:"Feedback fetched successfully",feedback});
        } catch (error) {
            res.status(500).json({ message: "Error in routes", error });
        }   
    }

    async deleteFeedback(req: Request, res: Response) {
        try {
            const feedbackId = req.params.id;
            const feedback = await this.deleteFeedbackUseCase.execute(feedbackId);
            res.status(200).json({message:"Feedback deleted successfully",feedback});
        } catch (error) {
            res.status(500).json({ message: "Error in routes", error });
        }   
    }
}