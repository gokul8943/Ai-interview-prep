import { FeedbackRepository } from "../../adapters/interfaces/FeedbackRepository";


export class getFeedbackById{
    constructor(private feedbackRepository: FeedbackRepository) { }
    async execute(feedbackId: string): Promise<any> {
        return this.feedbackRepository.getFeedbackById(feedbackId);
    } 
}