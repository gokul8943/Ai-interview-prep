import { Model } from "mongoose";
import { AdminRepository } from "../interfaces/Admin/AdminRepository";
import { IUserSchema } from "../interfaces/IUserSchema";

export class AdminRepositoryImpl implements AdminRepository {
    private readonly Usermodel: Model<IUserSchema>
    constructor(userModel: Model<IUserSchema>) {
        this.Usermodel = userModel
    }

    async getUserById(userId: string): Promise<any> {
        try {
            const user = await this.Usermodel.findById(userId)            
            return user;
        } catch (error) {
            console.error("An error occurred on admin repo", error);
            return false;
        }
    }

    async getUsers(): Promise<any> {
        try {
            const users = await this.Usermodel.find({});
            return users;
        } catch (error) {
            console.error("An error occurred on admin repo", error);
            return false;
        }
    }

    async userAccess(userId: string, access: boolean): Promise<any> {
        try {
            const user = await this.Usermodel.findByIdAndUpdate(userId, { isVerified: access })
            return user;
        } catch (error) {
            console.error("An error occurred on admin repo", error);
            return false;
        }
    }

}