import { InterviewRepository } from "../../adapters/interfaces/InterviewRepository";

export class GenerateQuestions {
    constructor(private InterviewRepository: InterviewRepository) { }

    async execute(interviewId: string,interviewQuestions: any): Promise<any> {
        return this.InterviewRepository.generateInterviewQuestions(interviewId,interviewQuestions );
    }
}