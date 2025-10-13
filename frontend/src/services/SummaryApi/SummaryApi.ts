import axios from '@/constants/Axios'

export const getSummaryByInterviewId = (interviewId: string) => {
    return axios.get(`interview/get-summary/${interviewId}`)
}
export const generateSummary = (interviewId: string) => {
  return axios.post(`/interview/generate-summary/${interviewId}`);
};
