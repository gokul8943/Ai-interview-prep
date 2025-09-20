import { Model } from "mongoose";
import { IInterviewSchema } from "../interfaces/IInterviewSchema";
import { InterviewRepository } from "../interfaces/InterviewRepository";
import { IQuestionSchema } from "../interfaces/IQuestionSchema";



export class InterviewRepositoryImpl implements InterviewRepository {
    private readonly InterviewModel: Model<IInterviewSchema>
    private readonly QuestionModel: Model<IQuestionSchema>

    constructor(
        interviewModel: Model<IInterviewSchema>,
        questionModel: Model<IQuestionSchema>
    ) {
        this.InterviewModel = interviewModel
        this.QuestionModel = questionModel
    }

    async createInterview(interviewData: any, questions: any): Promise<any> {
        try {

            const questionDoc = await this.QuestionModel.create({
                questions: questions,
            });

            const newInterview = await this.InterviewModel.create({
                ...interviewData,
                question: questionDoc._id,
            });

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

    async getInterviewQuestionsById(interviewId: string): Promise<any> {
        try {
            const interview = await this.InterviewModel.findById(interviewId).populate("question");
                if(!interview){
                    throw new Error("Interview not found");
                }
            return interview.question;
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

}