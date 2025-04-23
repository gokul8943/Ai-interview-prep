
export interface IQuestionSchema extends Document {
    questions: string[];
    createdAt: Date;
    updatedAt: Date;
}