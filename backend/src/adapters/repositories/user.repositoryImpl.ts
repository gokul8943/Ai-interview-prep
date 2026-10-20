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
        return this.InterviewModel.find({ userId }).populate('summary');
    }
}