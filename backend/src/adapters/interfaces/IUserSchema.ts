import { Document } from "mongoose";

export interface IUserSchema extends Document{
    name: string;
    email: string;
    password: string;
    googleId: string;
    role:string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date
}