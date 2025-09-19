import mongoose, { mongo } from "mongoose";


export interface IInterviewSchema extends Document {
    userId: mongoose.Types.ObjectId;
    role: string;
    type: string;
    experience: number;
    techstack: string;
    level: string;
    questions: mongoose.Types.ObjectId[];
    finalized: boolean;
    createdAt: Date;
    updatedAt: Date;
}
