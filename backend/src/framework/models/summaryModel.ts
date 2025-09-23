import mongoose from "mongoose";
import { ISummarySchema } from "../../adapters/interfaces/ISummarySchema";

const summarySchema = new mongoose.Schema<ISummarySchema>({
    communication: { type: Number, min: 0, max: 100 }, 
    strengths: [{ type: String }], 
    areasForImprovement: [{ type: String }],
    finalRecommendation: { type: String }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Summary = mongoose.model<ISummarySchema>("Summary", summarySchema);
export default Summary;
