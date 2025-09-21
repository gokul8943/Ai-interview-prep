import mongoose from "mongoose";
import { IQuestionSchema } from "../../adapters/interfaces/IQuestionSchema";


const questionSchema = new mongoose.Schema<IQuestionSchema>({
    questions: [
        {
            id: { type: Number },
            question: { type: String, required: true },
            answer: { type: String, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Question = mongoose.model<IQuestionSchema>("Question", questionSchema);
export default Question