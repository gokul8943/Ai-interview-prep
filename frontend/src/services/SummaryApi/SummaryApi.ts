import axios from '@/constants/Axios'

export const getSummaryByInterviewId = (interviewId: string) => {
    return axios.get(`interview/v1/get-summary/${interviewId}`)
}
export const generateSummary = (interviewId: string) => {
  return axios.post(`/interview/v1/generate-summary/${interviewId}`);
};
