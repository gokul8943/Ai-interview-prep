import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";


export class CreateInterview {
  constructor(private authRepository: InterviewRepository) { }

  async execute(interViewData: any): Promise<any> {
    return this.authRepository.createInterview(interViewData);
  }
}