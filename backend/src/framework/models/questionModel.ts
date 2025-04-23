import mongoose from "mongoose";
import { IQuestionSchema } from "../../adapters/interfaces/IQuestionSchema";


const questionSchema = new mongoose.Schema<IQuestionSchema>({
    questions: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Question = mongoose.model<IQuestionSchema>("Question", questionSchema);
export default Question