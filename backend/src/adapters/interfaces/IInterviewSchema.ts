import mongoose, { mongo } from "mongoose";


export interface IInterviewSchema extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    domain: string;
    type: string;
    experience: number;
    topics: string[];
    level: string;
    question: mongoose.Types.ObjectId;
    finalized: boolean;
    createdAt: Date;
    updatedAt: Date;
}
