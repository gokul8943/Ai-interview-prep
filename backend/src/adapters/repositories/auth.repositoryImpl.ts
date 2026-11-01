import { Model } from "mongoose";
import { IUserSchema } from "../interfaces/IUserSchema";
import { AuthRepository } from "../interfaces/AuthRepository";

export class AuthRepositoryImpl implements AuthRepository {
    private readonly UserModel: Model<IUserSchema>;

    constructor(userModel: Model<IUserSchema>) {
        this.UserModel = userModel;
    }

    async signUp(userData: any): Promise<any> {
        return this.UserModel.create(userData);
    }

    async findByEmail(email: string): Promise<any> {
        return this.UserModel.findOne({ email });
    }

    async findByPhone(phone: string): Promise<any> {
        return this.UserModel.findOne({ phone });
    }

    async findById(userId: string): Promise<any> {
        return this.UserModel.findById(userId);
    }

    async updatePassword(userId: string, passwordHash: string): Promise<void> {
        await this.UserModel.updateOne({ _id: userId }, { $set: { password: passwordHash } });
    }

    async markVerified(email: string): Promise<void> {
        await this.UserModel.updateOne({ email }, { $set: { isVerified: true } });
    }
}
