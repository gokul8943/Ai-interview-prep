import axios from '@/constants/Axios'

export const getSummaryByInterviewId = (data: any) => {
    return axios.post('interview/get-summary', data)
}
export const generateSummary = (interviewId: string) => {
  return axios.post(`/interview/generate-summary/${interviewId}`);
};
