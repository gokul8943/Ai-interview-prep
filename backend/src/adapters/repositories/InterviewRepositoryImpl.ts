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
            if (!interview) {
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

    async saveAnswer(interviewId: string, questionId: number, answer: string): Promise<any> {
        try {
            // 1. Find the interview to get linked Question document
            const interview = await this.InterviewModel.findById(interviewId).populate("question");
            if (!interview) {
                throw new Error("Interview not found");
            }

            // 2. Update the specific question answer inside Question model
            const updatedQuestionDoc = await this.QuestionModel.findOneAndUpdate(
                { _id: interview.question, "questions.id": questionId },
                { $set: { "questions.$.answer": answer } },
                { new: true }
            );

            return updatedQuestionDoc;
        } catch (error) {
            console.error("An error occurred on interview repo", error);
            return false;
        }
    }
async getSummary(interviewId: string): Promise<any> {
    try {
        const interview = await this.InterviewModel.findById(interviewId).populate("summary");
        if (!interview) {
            throw new Error("Interview not found");
        }
        return interview.summary;
    } catch (error) {
        console.error("An error occurred on interview repo", error);
        return false;
    }
}

}