import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";


export class CreateInterview {
  constructor(private interviewRepository: InterviewRepository) { }

  async execute(interViewData: any,questions: any): Promise<any> {
    return this.interviewRepository.createInterview(interViewData,questions);
  }
}