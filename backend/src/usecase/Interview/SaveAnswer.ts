import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";


export class SaveAnswer {
  constructor(private interviewRepository: InterviewRepository) { }

  async execute(interviewId: string, userId: string, questionId: number, answer: any): Promise<any> {
    return this.interviewRepository.saveAnswer(interviewId, userId, questionId, answer);
  }
}
