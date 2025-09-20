import { Request, Response } from "express";
import { CreateInterview } from "../../usecase/Interview/CreateInterview";
import { GetInterview } from "../../usecase/Interview/GetInterview";
import { GetInterviewById } from "../../usecase/Interview/GetInterviewById";
import { DeleteInterview } from "../../usecase/Interview/DeleteInterview";


import { generateInterviewQuestions } from "../../framework/services/GeminiAiService";


export class InterviewController {
    constructor(
        private readonly createInterviewUseCase: CreateInterview,
        private readonly getInterviewUseCase: GetInterview,
        private readonly getInterviewByIdUseCase: GetInterviewById,
        private readonly deleteInterviewUseCase: DeleteInterview,
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

    async getInterviews(req: Request, res: Response) {
        try {
            const interviews = await this.getInterviewUseCase.execute();
            res.status(200).json({ message: "Interviews fetched successfully", interviews });
        } catch (error) {
            console.error("Error getting interviews:", error);
            res.status(500).json({ message: "Error getting interviews" });
        }
    }

    async getInterviewById(req: Request, res: Response) {
        try {
            const interviewId = req.params.id;
            const interview = await this.getInterviewByIdUseCase.execute(interviewId);
            res.status(200).json({ message: "Interview fetched successfully", interview });
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

}