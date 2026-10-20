import { Model } from "mongoose";
import { IInterviewSchema } from "../interfaces/IInterviewSchema";
import { InterviewRepository } from "../interfaces/InterviewRepository";
import { IQuestionSchema } from "../interfaces/IQuestionSchema";
import { generateSummaryService } from "../../framework/services/geminiAiService";
import { ISummarySchema } from "../interfaces/ISummarySchema";
import { IUserSchema } from "../interfaces/IUserSchema";

const isOwner = (interview: { userId?: any }, userId: string): boolean => {
    return Boolean(interview?.userId) && String(interview.userId) === String(userId);
};

export class InterviewRepositoryImpl implements InterviewRepository {
    private readonly InterviewModel: Model<IInterviewSchema>
    private readonly QuestionModel: Model<IQuestionSchema>
    private readonly SummaryModel: Model<ISummarySchema>
    private readonly UserModel: Model<IUserSchema>

    constructor(
        interviewModel: Model<IInterviewSchema>,
        questionModel: Model<IQuestionSchema>,
        summaryModel: Model<ISummarySchema>,
        userModel: Model<IUserSchema>
    ) {
        this.InterviewModel = interviewModel
        this.QuestionModel = questionModel
        this.SummaryModel = summaryModel
        this.UserModel = userModel
    }

    async createInterview(ownerId: string, interviewData: any, questions: any): Promise<any> {
        const questionDoc = await this.QuestionModel.create({
            questions: questions,
        });

        const { userId: _ignoredUserId, summary: _ignoredSummary, ...rest } = interviewData || {};

        return this.InterviewModel.create({
            ...rest,
            userId: ownerId,
            question: questionDoc._id,
        });
    }

    async getInterviewsByUser(userId: string): Promise<any> {
        return this.InterviewModel.find({ userId }).sort({ createdAt: -1 });
    }

    async getInterviewQuestionsById(interviewId: string, userId: string): Promise<any> {
        const interview = await this.InterviewModel.findById(interviewId);
        if (!interview || !isOwner(interview, userId)) {
            return null;
        }
        const populated = await interview.populate("question");
        return populated.question;
    }

    async deleteInterview(interviewId: string, userId: string): Promise<any> {
        return this.InterviewModel.findOneAndDelete({ _id: interviewId, userId });
    }

    async saveAnswer(interviewId: string, userId: string, questionId: number, answer: string): Promise<any> {
        const interview = await this.InterviewModel.findById(interviewId);
        if (!interview || !isOwner(interview, userId)) {
            return null;
        }

        return this.QuestionModel.findOneAndUpdate(
            { _id: interview.question, "questions.id": questionId },
            { $set: { "questions.$.answer": answer } },
            { new: true }
        );
    }

    async generateSummary(interviewId: string, userId: string): Promise<any> {
        const interview = await this.InterviewModel.findById(interviewId);
        if (!interview || !isOwner(interview, userId)) {
            return null;
        }

        await interview.populate("question");
        const questionDoc = interview.question as unknown as IQuestionSchema;
        if (!questionDoc) {
            return null;
        }

        const interviewData = {
            title: interview.title,
            domain: interview.domain,
            type: interview.type,
            topics: interview.topics,
            level: interview.level,
            questions: questionDoc.questions.map((q) => ({
                question: q.question,
                answer: q.answer,
            })),
        };

        const generated = await generateSummaryService(interviewData);

        if (!generated) {
            throw new Error("Failed to generate summary");
        }

        const summaryDoc = await this.SummaryModel.create({
            communication: Math.floor(Math.random() * 21) + 80,
            strengths: generated.strengths || [],
            areasForImprovement: generated.areasForImprovement || [],
            finalRecommendation: `${generated.summary}\n\nRecommendation: ${generated.recommendation}`,
        });

        interview.summary = summaryDoc._id;
        await interview.save();

        return summaryDoc;
    }

    async getSummary(interviewId: string, userId: string): Promise<any> {
        const interview = await this.InterviewModel.findById(interviewId);
        if (!interview || !isOwner(interview, userId)) {
            return null;
        }
        await interview.populate("summary");
        return interview.summary;
    }

    async getInterviewByUserId(userId: string): Promise<any> {
        const user = await this.UserModel.findById(userId).select("-password -phone -googleId");
        const interview = await this.InterviewModel.find({ userId }).sort({ createdAt: -1 });

        return { user, interview };
    }
}
