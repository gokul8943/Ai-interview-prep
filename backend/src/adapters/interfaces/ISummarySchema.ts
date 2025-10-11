
export interface ISummarySchema extends Document {
    communication: number;
    summary: string;
    recommendation: string;
    strengths: string[];
    areasForImprovement: string[];
    finalRecommendation: string;
    createdAt: Date;
    updatedAt: Date;
}