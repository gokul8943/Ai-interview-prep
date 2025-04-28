

export interface InterviewRepository {
    createInterview(interview: any): Promise<any>
    getInterviews(): Promise<any>
    getInterviewById(interviewId: string): Promise<any>
    deleteInterview(interviewId: string): Promise<any>
}