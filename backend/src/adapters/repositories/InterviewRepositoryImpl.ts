import { Model } from "mongoose";
import { IInterviewSchema } from "../interfaces/IInterviewSchema";
import { InterviewRepository } from "../interfaces/InterviewRepository";


export class InterviewRepositoryImpl implements InterviewRepository {
     private readonly InterviewModel: Model<IInterviewSchema>

     constructor(interviewModel: Model<IInterviewSchema>) {
        this.InterviewModel = interviewModel
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
}