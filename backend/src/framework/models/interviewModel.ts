import mongoose, { Mongoose, Schema } from "mongoose";
import { IInterviewSchema } from "../../adapters/interfaces/IInterviewSchema";


const interviewSchema = new mongoose.Schema<IInterviewSchema>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, required: true },
    type: { type: String, required: true },
    experience: { type: Number, required: true },
    techstack: { type: String, required: true },
    level: { type: String, required: true },
    questions: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    finalized: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Interview = mongoose.model<IInterviewSchema>("Interview", interviewSchema);
export default Interview;