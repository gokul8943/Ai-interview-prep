import axios from '@/constants/Axios'

export const register = (data: any) => {
    return axios.post('/auth/v1/sign-up', data)
}
export const login = (data: any) => {
    return axios.post('/auth/v1/sign-in', data)
}
export const sendOtp = (email: any) => {
    return axios.post('/auth/v1/generate-otp', { email })
}

export const verifyOtp = (email: string, otp: any) => {
    return axios.post('/auth/v1/verify-otp', { email, otp })
}

export const getUserByInterviews = (userId: string) => {
    return axios.get(`/interview/v1/get-by-user/${userId}`)
}

export const getUserById = (userId: string) => {
    return axios.get(`/admin/v1/get-user/${userId}`)
}