export interface InterviewRepository {
    createInterview(ownerId: string, interview: any, questions: any): Promise<any>
    getInterviewsByUser(userId: string): Promise<any>
    getInterviewQuestionsById(interviewId: string, userId: string): Promise<any>
    deleteInterview(interviewId: string, userId: string): Promise<any>
    saveAnswer(interviewId: string, userId: string, questionId: number, answer: string): Promise<any>
    getSummary(interviewId: string, userId: string): Promise<any>
    generateSummary(interviewId: string, userId: string): Promise<any>
    getInterviewByUserId(userId: string): Promise<any>
}
