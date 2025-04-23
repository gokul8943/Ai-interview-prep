import { Model } from "mongoose";
import { IUserSchema } from "../interfaces/IUserSchema";
import { AuthRepository } from "../interfaces/AuthRepository";


export class AuthRepositoryImpl implements AuthRepository {
    private readonly UserModel:Model<IUserSchema>

    constructor(userModel:Model<IUserSchema>) {
        this.UserModel = userModel
    }

    async signUp(){
        try {
            
        } catch (error) {
            
        }
    }
}