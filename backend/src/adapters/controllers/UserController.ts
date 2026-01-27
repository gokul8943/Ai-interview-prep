import { Request, Response } from "express";
import { GetUserInterview } from "../../usecase/User/GetUserInterview";

export class UserController {
    constructor(
        private readonly getUserInterviewUseCase: GetUserInterview
    ) { }
    async getUserInterviews(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const interviews = await this.getUserInterviewUseCase.execute(userId);
            res.status(200).json({ message: "User interviews fetched successfully", interviews });
        } catch (error) {
            console.error("Error getting user interviews:", error);
            res.status(500).json({ message: "Error getting user interviews" });
        }
    }
}