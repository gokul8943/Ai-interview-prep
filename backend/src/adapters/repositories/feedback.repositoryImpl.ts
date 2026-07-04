import { Model } from "mongoose";
import { IFeedbackSchema } from "../interfaces/IFeedbackSchema";
import { FeedbackRepository } from "../interfaces/FeedbackRepository";



export class FeedbackRepositoryImpl implements FeedbackRepository {
    private readonly FeedbackModel: Model<IFeedbackSchema>
    constructor(feedbackModel: Model<IFeedbackSchema>) {
        this.FeedbackModel = feedbackModel;
    }
    async createFeedback(feedbackData: any): Promise<any> {
        try {
            const newFeedback = await this.FeedbackModel.create(feedbackData);
            return newFeedback;
        } catch (error) {
            console.error("An error occurred on feedback repo", error);
            return false;
        }
    }
    async getFeedbacks(): Promise<any> {
        try {
            const feedback = await this.FeedbackModel.find({});
            return feedback
        } catch (error) {
            console.error("An error occurred on feedback repo", error);
            return false;
        }
    }

    async getFeedbackById(feedbackId: string): Promise<any> {
        try {
            const feedback = await this.FeedbackModel.findById(feedbackId);
            return feedback;
        } catch (error) {
            console.error("An error occurred on feedback repo", error);
            return false;
        }
    }

    async deleteFeedback(feedbackId: string): Promise<any> {
        try {
            const feedback = await this.FeedbackModel.findByIdAndDelete(feedbackId);
            return feedback;
        } catch (error) {
            console.error("An error occurred on feedback repo", error);
            return false;
        }
    }

    
}