import axios from '@/constants/Axios'

export const createInterview = (data: any) => {
    return axios.post('/interview/create', data)
}

export const getInterviewQuestionsById = (interviewId: string,) => {
    return axios.get(`/interview/get-question/${interviewId}`)
}

export const saveAnswer = (interviewId: string, data: { questionId: number; answer: string }) => {
  return axios.post(`/interview/save-answer/${interviewId}`, data);
};