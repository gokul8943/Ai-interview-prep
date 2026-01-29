import axios from '@/constants/Axios'

export const createInterview = (data: any) => {
    return axios.post('/interview/v1/create', data)
}

export const getInterviewQuestionsById = (interviewId: string,) => {
    return axios.get(`/interview/v1/get-question/${interviewId}`)
}

export const saveAnswer = (interviewId: string, data: { questionId: number; answer: string }) => {
  return axios.post(`/interview/v1/save-answer/${interviewId}`, data);
};