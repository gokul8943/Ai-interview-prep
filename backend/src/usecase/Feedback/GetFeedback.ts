import { FeedbackRepository } from "../../adapters/interfaces/FeedbackRepository";


export class getFeedback {
    constructor(private feedbackRepository: FeedbackRepository) { }

    async execute(): Promise<any> {
      return this.feedbackRepository.getFeedbacks();
    }
}