import { Request, Response } from "express";
import { CreateInterview } from "../../usecase/Interview/CreateInterview";


export class InterviewController {
    constructor(
        private readonly createInterviewUseCase: CreateInterview

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
}