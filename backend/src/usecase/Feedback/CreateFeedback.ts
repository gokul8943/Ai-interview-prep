import { FeedbackRepository } from "../../adapters/interfaces/FeedbackRepository";

export class CreateFeedback {
    constructor(private feedbackRepository: FeedbackRepository) { }

    async execute(feedbackData: any): Promise<any> {
      return this.feedbackRepository.createFeedback(feedbackData);
    }
}

