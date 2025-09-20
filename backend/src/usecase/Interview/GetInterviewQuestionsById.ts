import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";

export class GetInterviewQuestionsById {
  constructor(private interviewRepository: InterviewRepository) { }

  async execute(interviewId: string): Promise<any> {
    return this.interviewRepository.getInterviewQuestionsById(interviewId);
  }
}