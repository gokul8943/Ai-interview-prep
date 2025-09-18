import { Model } from "mongoose";
import { IInterviewSchema } from "../interfaces/IInterviewSchema";
import { InterviewRepository } from "../interfaces/InterviewRepository";
import { IQuestionSchema } from "../interfaces/IQuestionSchema";



export class InterviewRepositoryImpl implements InterviewRepository {
     private readonly InterviewModel: Model<IInterviewSchema>
     private readonly QuestionModel: Model<IQuestionSchema>

     constructor(
        interviewModel: Model<IInterviewSchema>
        , questionModel: Model<IQuestionSchema>
    ) {
        this.InterviewModel = interviewModel
        this.QuestionModel = questionModel
    }

    async createInterview(interviewData: any): Promise<any> {
        try {
            const newInterview = await this.InterviewModel.create(interviewData);
            return newInterview;
        } catch (error) {
            console.error("An error occurred on interview repo", error);
            return false;
        }
    }

    async getInterviews(): Promise<any> {
        try {
            const interviews = await this.InterviewModel.find({});
            return interviews;
        } catch (error) {
            console.error("An error occurred on interview repo", error);
            return false;
        }
    }

    async getInterviewById(interviewId: string): Promise<any> {
        try {
            const interview = await this.InterviewModel.findById(interviewId);
            return interview;
        } catch (error) {
            console.error("An error occurred on interview repo", error);
            return false;
        }
    }
    async deleteInterview(interviewId: string): Promise<any> {
        try {
            const interview = await this.InterviewModel.findByIdAndDelete(interviewId);
            return interview;
        } catch (error) {
            console.error("An error occurred on interview repo", error);
            return false;
        }
    }

    async generateInterviewQuestions(interviewId: string,interviewQuestions: any): Promise<any> {
        try {
            const interview = await this.InterviewModel.findById(interviewId);
             const question = await this.QuestionModel.create(interviewQuestions);
        
            return {...interview,questions:question};
        } catch (error) {
            console.error("An error occurred on interview repo", error);
            return false;
        }
    }   
}