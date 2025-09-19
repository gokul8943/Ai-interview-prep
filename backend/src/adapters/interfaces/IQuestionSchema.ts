
export interface IQuestionSchema extends Document {
     questions: { id: number; question: string }[];
    createdAt: Date;
    updatedAt: Date;
}