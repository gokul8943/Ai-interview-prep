import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";


export class GetInterview {
  constructor(private authRepository: InterviewRepository) { }

  async execute(userId: string): Promise<any> {
    return this.authRepository.getInterviewsByUser(userId);
  }
}
