export interface InterviewRepository {
    createInterview(interview: any,questions: any): Promise<any>
    getInterviews(): Promise<any>
    getInterviewQuestionsById(interviewId: string): Promise<any>
    deleteInterview(interviewId: string): Promise<any>
}