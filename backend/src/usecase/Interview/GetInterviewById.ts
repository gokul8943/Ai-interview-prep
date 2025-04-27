import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";

export class GetInterviewById {
  constructor(private authRepository: InterviewRepository) { }

  async execute(interviewId: string): Promise<any> {
    return this.authRepository.getInterviewById(interviewId);
  }
}