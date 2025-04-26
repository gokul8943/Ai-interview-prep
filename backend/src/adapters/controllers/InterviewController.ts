import { Request, Response } from "express";
import { CreateInterview } from "../../usecase/Interview/CreateInterview";
import { GetInterview } from "../../usecase/Interview/GetInterview";


export class InterviewController {
    constructor(
        private readonly createInterviewUseCase: CreateInterview,
        private readonly getInterviewUseCase: GetInterview,

    ) { }

    async createInterview(req: Request, res: Response) {
        try {
            const interviewData = req.body;
            const newInterview = await this.createInterviewUseCase.execute(interviewData);
            res.status(201).json(newInterview);
        } catch (error) {
            console.error("Error creating interview:", error);
            res.status(500).json({ message: "Error creating interview" });
        }
    }

    async getInterviews(req: Request, res: Response) {
        try {
            const interviews = await this.getInterviewUseCase.execute();
            res.status(200).json(interviews);
        } catch (error) {
            console.error("Error getting interviews:", error);
            res.status(500).json({ message: "Error getting interviews" });
        }
    }
}