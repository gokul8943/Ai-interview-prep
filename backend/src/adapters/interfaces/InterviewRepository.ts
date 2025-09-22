export interface InterviewRepository {
    createInterview(interview: any, questions: any): Promise<any>
    getInterviews(): Promise<any>
    getInterviewQuestionsById(interviewId: string): Promise<any>
    deleteInterview(interviewId: string): Promise<any>
    saveAnswer(interviewId: string,questionId: number, answer: string): Promise<any>
    getSummary(interviewId: string): Promise<any>
    generateSummary(interviewId: string): Promise<any>
}