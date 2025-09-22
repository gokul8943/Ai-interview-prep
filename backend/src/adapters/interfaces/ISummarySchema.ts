
export interface ISummarySchema extends Document {
    summary: { text: string; score: number}[];
    createdAt: Date;
    updatedAt: Date;
}