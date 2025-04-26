import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";


export class GetInterview {
  constructor(private authRepository: InterviewRepository) { }

  async execute(): Promise<any> {
    return this.authRepository.getInterviews();
  }
}