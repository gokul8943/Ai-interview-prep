export interface FeedbackRepository {
    createFeedback(feedback: any): Promise<any>;
    getFeedbacks(): Promise<any>;
    getFeedbackById(feedbackId: string): Promise<any>;
    deleteFeedback(feedbackId: string): Promise<any>;
}