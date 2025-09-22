import { Request, Response } from "express";
import { CreateInterview } from "../../usecase/Interview/CreateInterview";
import { GetInterview } from "../../usecase/Interview/GetInterview";
import { GetInterviewQuestionsById } from "../../usecase/Interview/GetInterviewQuestionsById";
import { DeleteInterview } from "../../usecase/Interview/DeleteInterview";
import { SaveAnswer } from "../../usecase/Interview/SaveAnswer";
import { GenerateSummary } from "../../usecase/Interview/GenerateSummary";


import { generateInterviewQuestions } from "../../framework/services/GeminiAiService";
import { GetSummary } from "../../usecase/Interview/GetSummary";


export class InterviewController {
    constructor(
        private readonly createInterviewUseCase: CreateInterview,
        private readonly getInterviewUseCase: GetInterview,
        private readonly getInterviewByIdUseCase: GetInterviewQuestionsById,
        private readonly deleteInterviewUseCase: DeleteInterview,
        private readonly saveAnswersUseCase: SaveAnswer,
        private readonly getSummaryUseCase: GetSummary,
        private readonly generateSummaryUseCase: GenerateSummary
    ) { }

    async createInterview(req: Request, res: Response) {
        try {
            const interviewData = req.body;

            const questions = await generateInterviewQuestions(
                interviewData.domain,
                interviewData.level,
                interviewData.questionCount,
                interviewData.topics
            );

            const newInterview = await this.createInterviewUseCase.execute(interviewData, questions);
            res.status(201).json({ message: "Interview created successfully", newInterview });
        } catch (error) {
            console.error("Error creating interview:", error);
            res.status(500).json({ message: "Error creating interview" });
        }
    }

    async getInterview(req: Request, res: Response) {
        try {
            const interviews = await this.getInterviewUseCase.execute();
            res.status(200).json({ message: "Interviews fetched successfully", interviews });
        } catch (error) {
            console.error("Error getting interviews:", error);
            res.status(500).json({ message: "Error getting interviews" });
        }
    }

    async getInterviewQuestionsById(req: Request, res: Response) {
        try {
            const interviewId = req.params.id;
            const interviewQuestions = await this.getInterviewByIdUseCase.execute(interviewId);
            res.status(200).json({ message: "Interview fetched successfully", interviewQuestions });
        } catch (error) {
            console.error("Error getting interview by ID:", error);
            res.status(500).json({ message: "Error getting interview by ID" });
        }
    }
    async deleteInterview(req: Request, res: Response) {
        try {
            const interviewId = req.params.id;
            const interview = await this.deleteInterviewUseCase.execute(interviewId);
            res.status(200).json({ message: "Interview deleted successfully", interview });
        } catch (error) {
            console.error("Error getting interview by ID:", error);
            res.status(500).json({ message: "Error getting interview by ID" });
        }
    }

    async saveAnswer(req: Request, res: Response) {
        try {
            const interviewId = req.params.id;
            const { questionId, answer } = req.body
            const savedAnswers = await this.saveAnswersUseCase.execute(interviewId, questionId, answer);
            res.status(200).json({ message: "Answers saved successfully", savedAnswers });
        } catch (error) {
            console.error("Error saving answers:", error);
            res.status(500).json({ message: "Error saving answers" });
        }
    }

    async generateSummary(req: Request, res: Response) {
        try {
            const interviewId = req.params.interviewId;
            const summary = await this.generateSummaryUseCase.execute(interviewId)
            res.status(200).json({ message: "Summary generated successfully", summary });
        } catch (error) {
            console.error("Error generating summary:", error);
            res.status(500).json({ message: "Error generating summary" });
        }
    }


    async getSummary(req: Request, res: Response) {
        try {
            const interviewId = req.params.id;
            const summary = await this.getSummaryUseCase.execute(interviewId);
            res.status(200).json({ message: "Summary fetch successfully", summary });
        } catch (error) {
            console.error("Error generating summary:", error);
            res.
                status(500).json({ message: "Error generating summary" });
        }
    }


}