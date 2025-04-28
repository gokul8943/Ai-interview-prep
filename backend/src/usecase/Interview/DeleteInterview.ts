import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";

export class DeleteInterview {
    constructor(private authRepository: InterviewRepository) { }
    
    async execute(interviewId: string): Promise<any> {
        return this.authRepository.deleteInterview(interviewId);
    }
}