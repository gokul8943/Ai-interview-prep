import { Model } from "mongoose";
import { IInterviewSchema } from "../interfaces/IInterviewSchema";
import { InterviewRepository } from "../interfaces/InterviewRepository";
import { IQuestionSchema } from "../interfaces/IQuestionSchema";
import { generateSummaryService } from "../../framework/services/GeminiAiService";
import { ISummarySchema } from "../interfaces/ISummarySchema";



export class InterviewRepositoryImpl implements InterviewRepository {
    private readonly InterviewModel: Model<IInterviewSchema>
    private readonly QuestionModel: Model<IQuestionSchema>
    private readonly SummaryModel: Model<ISummarySchema>

    constructor(
        interviewModel: Model<IInterviewSchema>,
        questionModel: Model<IQuestionSchema>,
        summaryModel: Model<ISummarySchema>
    ) {
        this.InterviewModel = interviewModel
        this.QuestionModel = questionModel
        this.SummaryModel = summaryModel
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

            const interview = await this.InterviewModel.findById(interviewId).populate("question");
            if (!interview) {
                throw new Error("Interview not found");
            }

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

    async generateSummary(interviewId: string): Promise<any> {
        try {
            const interview = await this.InterviewModel.findById(interviewId)
                .populate<{ question: IQuestionSchema }>("question");

            if (!interview) {
                throw new Error("Interview not found");
            }

            const interviewData = {
                title: interview.title,
                domain: interview.domain,
                type: interview.type,
                topics: interview.topics,
                level: interview.level,
                questions: (interview.question as IQuestionSchema).questions.map((q) => ({
                    question: q.question,
                    answer: q.answer,
                })),
            };

            const generated = await generateSummaryService(interviewData);
            console.log("generate", generated);


            if (!generated) {
                throw new Error("Failed to generate summary");
            }

            const summaryDoc = await this.SummaryModel.create({
                communication: Math.floor(Math.random() * 21) + 80, // optional score (e.g., 80–100)
                strengths: generated.strengths|| [],
                areasForImprovement: generated.areasForImprovement || [],
                finalRecommendation: `${generated.summary}\n\nRecommendation: ${generated.recommendation}`,
            });
            console.log('summary save', summaryDoc);

            // Link summary to interview
            interview.summary = summaryDoc._id;
            await interview.save();

            return summaryDoc;
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