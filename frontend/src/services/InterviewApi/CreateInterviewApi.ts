import axios from '@/constants/Axios'

export const createInterview = (data: any) => {
    return axios.post('/interview/create', data)
}

export const getInterviewQuestionsById = (interviewId: string,) => {
    return axios.get(`/interview/get/${interviewId}`)
}