import { Request, Response } from "express";
import { CreateInterview } from "../../usecase/Interview/createInterview";
import { GetInterview } from "../../usecase/Interview/getInterview";
import { GetInterviewQuestionsById } from "../../usecase/Interview/getInterviewQuestionsById";
import { DeleteInterview } from "../../usecase/Interview/deleteInterview";
import { SaveAnswer } from "../../usecase/Interview/saveAnswer";
import { GenerateSummary } from "../../usecase/Interview/generateSummary";
import { generateInterviewQuestions } from "../../framework/services/geminiAiService";
import { GetSummary } from "../../usecase/Interview/getSummary";
import { GetInterviewByUserId } from "../../usecase/Interview/getInterviewByUserId";

const NOT_FOUND = { message: "Interview not found" };

export class InterviewController {
    constructor(
        private readonly createInterviewUseCase: CreateInterview,
        private readonly getInterviewUseCase: GetInterview,
        private readonly getInterviewByIdUseCase: GetInterviewQuestionsById,
        private readonly deleteInterviewUseCase: DeleteInterview,
        private readonly saveAnswersUseCase: SaveAnswer,
        private readonly getSummaryUseCase: GetSummary,
        private readonly generateSummaryUseCase: GenerateSummary,
        private readonly getInterviewByUserIdUseCase: GetInterviewByUserId
    ) { }

    async createInterview(req: Request, res: Response) {
        try {
            const ownerId = req.user!.userId;
            const interviewData = req.body;

            const questions = await generateInterviewQuestions(
                interviewData.domain,
                interviewData.level,
                interviewData.topics,
                interviewData.questionCount,
            );

            const newInterview = await this.createInterviewUseCase.execute(ownerId, interviewData, questions);
            res.status(201).json({ message: "Interview created successfully", newInterview });
        } catch (error) {
            console.error("Error creating interview:", error instanceof Error ? error.message : error);
            res.status(500).json({ message: "Error creating interview" });
        }
    }

    async getInterview(req: Request, res: Response) {
        try {
            const interviews = await this.getInterviewUseCase.execute(req.user!.userId);
            res.status(200).json({ message: "Interviews fetched successfully", interviews });
        } catch (error) {
            console.error("Error getting interviews:", error instanceof Error ? error.message : error);
            res.status(500).json({ message: "Error getting interviews" });
        }
    }

    async getInterviewQuestionsById(req: Request, res: Response) {
        try {
            const interviewQuestions = await this.getInterviewByIdUseCase.execute(
                req.params.id,
                req.user!.userId
            );
            if (!interviewQuestions) {
                return res.status(404).json(NOT_FOUND);
            }
            res.status(200).json({ message: "Interview fetched successfully", interviewQuestions });
        } catch (error) {
            console.error("Error getting interview by ID:", error instanceof Error ? error.message : error);
            res.status(500).json({ message: "Error getting interview by ID" });
        }
    }

    async deleteInterview(req: Request, res: Response) {
        try {
            const interview = await this.deleteInterviewUseCase.execute(
                req.params.id,
                req.user!.userId
            );
            if (!interview) {
                return res.status(404).json(NOT_FOUND);
            }
            res.status(200).json({ message: "Interview deleted successfully", interview });
        } catch (error) {
            console.error("Error deleting interview:", error instanceof Error ? error.message : error);
            res.status(500).json({ message: "Error deleting interview" });
        }
    }

    async saveAnswer(req: Request, res: Response) {
        try {
            const { questionId, answer } = req.body;
            if (questionId === undefined || questionId === null || typeof answer !== "string") {
                return res.status(400).json({ message: "questionId and answer are required" });
            }
            const savedAnswers = await this.saveAnswersUseCase.execute(
                req.params.id,
                req.user!.userId,
                questionId,
                answer
            );
            if (!savedAnswers) {
                return res.status(404).json(NOT_FOUND);
            }
            res.status(200).json({ message: "Answers saved successfully", savedAnswers });
        } catch (error) {
            console.error("Error saving answers:", error instanceof Error ? error.message : error);
            res.status(500).json({ message: "Error saving answers" });
        }
    }

    async generateSummary(req: Request, res: Response) {
        try {
            const summary = await this.generateSummaryUseCase.execute(
                req.params.interviewId,
                req.user!.userId
            );
            if (!summary) {
                return res.status(404).json(NOT_FOUND);
            }
            res.status(200).json({ message: "Summary generated successfully", summary });
        } catch (error) {
            console.error("Error generating summary:", error instanceof Error ? error.message : error);
            res.status(500).json({ message: "Error generating summary" });
        }
    }

    async getSummary(req: Request, res: Response) {
        try {
            const summary = await this.getSummaryUseCase.execute(
                req.params.interviewId,
                req.user!.userId
            );
            if (!summary) {
                return res.status(404).json(NOT_FOUND);
            }
            res.status(200).json({ message: "Summary fetch successfully", summary });
        } catch (error) {
            console.error("Error fetching summary:", error instanceof Error ? error.message : error);
            res.status(500).json({ message: "Error fetching summary" });
        }
    }

    async getInterviewByUserId(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            if (userId !== req.user!.userId) {
                return res.status(403).json({ message: "Forbidden" });
            }
            const interviews = await this.getInterviewByUserIdUseCase.execute(userId);
            res.status(200).json({ message: "Interviews fetched successfully", interviews });
        } catch (error) {
            console.error("Error getting interviews:", error instanceof Error ? error.message : error);
            res.status(500).json({ message: "Error getting interviews" });
        }
    }
}
