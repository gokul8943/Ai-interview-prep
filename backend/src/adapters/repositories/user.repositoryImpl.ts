import { Model } from "mongoose"
import { IUserSchema } from "../interfaces/IUserSchema"
import { UserRepository } from "../interfaces/UserRepository"
import { IInterviewSchema } from "../interfaces/IInterviewSchema"


export class UserRepositoryImpl implements UserRepository {
    private readonly UserModel: Model<IUserSchema>
    private readonly InterviewModel: Model<IInterviewSchema>
    constructor(
        userModel: Model<IUserSchema>,
        interviewModel: Model<IInterviewSchema>
    ) {
        this.UserModel = userModel;
        this.InterviewModel = interviewModel;
    }
    async getUserInterviews(userId: string): Promise<any> {
        try {
            const interviews = await this.InterviewModel.findById(userId).populate('summary');
            return interviews;
        } catch (error) {
            throw new Error("Failed to retrieve user interviews");
        }
    }
}