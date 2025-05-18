import { FeedbackRepository } from "../../adapters/interfaces/FeedbackRepository";


export class deleteFeedback {
    constructor(private readonly feedbackRepository: FeedbackRepository) {}
    async execute(feedbackId: string): Promise<any> {
        return await this.feedbackRepository.deleteFeedback(feedbackId);
    }
}