import mongoose, { Document,Schema } from "mongoose";
import{ IFeedbackSchema} from "../../adapters/interfaces/IFeedbackSchema";

const  feedbackSchema = new Schema<IFeedbackSchema>({
    interviewId: { type: Schema.Types.ObjectId, ref: "Interview", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalScore: { type: Number, required: true },
    categoryScores: { type: Number, required: true },
    strenght: { type: String, required: true },
    areaOfImprovements: { type: String, required: true },
    finalAssesements: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Feedback = mongoose.model<IFeedbackSchema>("Feedback", feedbackSchema);
export default feedbackSchema