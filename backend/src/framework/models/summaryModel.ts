import mongoose from "mongoose";
import { ISummarySchema } from "../../adapters/interfaces/ISummarySchema";

const summarySchema = new mongoose.Schema<ISummarySchema>({
    summary: [
        {
            text: { type: String},
            score: { type: Number},
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Summary = mongoose.model<ISummarySchema>("Summary", summarySchema);
export default Summary