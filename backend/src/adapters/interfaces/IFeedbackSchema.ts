import mongoose from "mongoose";

export interface IFeedbackSchema extends Document{
    interviewId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    totalScore:number;
    categoryScores:number;
    strenght:string;
    areaOfImprovements:string;
    finalAssesements:string;
    createdAt:Date;
    updatedAt:Date
} 