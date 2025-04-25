

export interface InterviewRepository {
    // getInterviews(): Promise<any>
    // getInterviewById(id: string): Promise<any>
    createInterview(interview: any): Promise<any>
}