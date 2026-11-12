import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";


export class GenerateSummary{
  constructor(private interviewRepository: InterviewRepository) { }

  async execute(interviewId: string, userId: string): Promise<any> {
    return this.interviewRepository.generateSummary(interviewId, userId);
  }
}
