
export interface ISummarySchema extends Document {
    communication: number;
    strengths: string[];
    areasForImprovement: string[];
    finalRecommendation: string;
    createdAt: Date;
    updatedAt: Date;
}