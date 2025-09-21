import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";


export class SaveAnswer {
  constructor(private interviewRepository: InterviewRepository) { }

  async execute(interviewId: any,answer: any): Promise<any> {
    return this.interviewRepository.createInterview(interviewId,answer);
  }
}