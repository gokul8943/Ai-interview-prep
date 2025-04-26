

export interface InterviewRepository {
    
    // getInterviewById(id: string): Promise<any>
    createInterview(interview: any): Promise<any>
    getInterviews(): Promise<any>
}