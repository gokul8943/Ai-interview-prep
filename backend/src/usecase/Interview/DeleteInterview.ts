import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";

export class DeleteInterview {
    private authRepository: InterviewRepository;

    constructor(interviewRepository: InterviewRepository) {
        this.authRepository = interviewRepository;
    }

    async execute(interviewId: string, userId: string): Promise<any> {
        return this.authRepository.deleteInterview(interviewId, userId);
    }
}
