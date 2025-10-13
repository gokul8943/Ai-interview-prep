import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";

export class GetInterviewByUserId {
    constructor(private interviewRepository: InterviewRepository) { }

    async execute(interviewId: string): Promise<any> {
        return this.interviewRepository.getInterviewByUserId(interviewId);
    }
}