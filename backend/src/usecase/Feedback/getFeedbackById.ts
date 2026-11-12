import { FeedbackRepository } from "../../adapters/interfaces/FeedbackRepository";


export class GetFeedbackById{
    constructor(private feedbackRepository: FeedbackRepository) { }
    async execute(feedbackId: string): Promise<any> {
        return this.feedbackRepository.getFeedbackById(feedbackId);
    } 
}