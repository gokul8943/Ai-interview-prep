import mongoose, { Mongoose, Schema } from "mongoose";
import { IInterviewSchema } from "../../adapters/interfaces/IInterviewSchema";


const interviewSchema = new mongoose.Schema<IInterviewSchema>({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    role: { type: String },
    type: { type: String },
    experience: { type: Number },
    techstack: { type: String },
    level: { type: String },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    finalized: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Interview = mongoose.model<IInterviewSchema>("Interview", interviewSchema);
export default Interview;