import mongoose, { Mongoose, Schema } from "mongoose";
import { IInterviewSchema } from "../../adapters/interfaces/IInterviewSchema";


const interviewSchema = new mongoose.Schema<IInterviewSchema>({
    userId: { type: Schema.Types.ObjectId, ref: "User",required: true },
    title: { type: String, required: true },
    domain: { type: String,required: true },
    type: { type: String },
    experience: { type: Number },
    topics: [{ type: String}],
    level: { type: String,required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question" },
    summary: { type: Schema.Types.ObjectId, ref: "Summary" },
    finalized: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Interview = mongoose.model<IInterviewSchema>("Interview", interviewSchema);
export default Interview;