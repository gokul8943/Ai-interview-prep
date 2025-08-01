import axios from '@/constants/Axios'

export const createInterview = (data:any)=> {
    return axios.post('/interview/create',data)
}
