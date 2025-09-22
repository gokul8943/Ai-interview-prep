import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";


export class GetSummary{
  constructor(private interviewRepository: InterviewRepository) { }

  async execute(interviewId: string): Promise<any> {
    return this.interviewRepository.getSummary(interviewId);
  }
}