import { Model } from "mongoose";
import { IUserSchema } from "../interfaces/IUserSchema";
import { AuthRepository } from "../interfaces/AuthRepository";


export class AuthRepositoryImpl implements AuthRepository {
    private readonly UserModel: Model<IUserSchema>

    constructor(userModel: Model<IUserSchema>) {
        this.UserModel = userModel
    }
    async signUp(userData: any): Promise<any> {
        try {
            const user = await this.UserModel.create(userData)
            return user;
        } catch (error) {
            console.error("An error occoured", error)
        }
    }

    async Login(email: string): Promise<any> {
        try {
            const userData = await this.UserModel.findOne({ email: email });

            return userData;
        } catch (error) {
            console.error("An error occurred on auth repo", error);
            return false;
        }
    }
}