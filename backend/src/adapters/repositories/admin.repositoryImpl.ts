import { Model } from "mongoose";
import { AdminRepository } from "../interfaces/Admin/AdminRepository";
import { IUserSchema } from "../interfaces/IUserSchema";

const USER_PROJECTION = "-password -phone -googleId";

export class AdminRepositoryImpl implements AdminRepository {
    private readonly Usermodel: Model<IUserSchema>
    constructor(userModel: Model<IUserSchema>) {
        this.Usermodel = userModel
    }

    async getUserById(userId: string): Promise<any> {
        return this.Usermodel.findById(userId).select(USER_PROJECTION);
    }

    async getUsers(): Promise<any> {
        return this.Usermodel.find({}).select(USER_PROJECTION);
    }

    async userAccess(userId: string, access: boolean): Promise<any> {
        return this.Usermodel.findByIdAndUpdate(
            userId,
            { isVerified: access },
            { new: true }
        ).select(USER_PROJECTION);
    }
}
