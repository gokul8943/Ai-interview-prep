import axios from '@/constants/Axios'

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export const register = (data: RegisterPayload) => {
    return axios.post('/auth/v1/sign-up', data)
}
export const login = (data: LoginPayload) => {
    return axios.post('/auth/v1/sign-in', data)
}
export const sendOtp = (email: string) => {
    return axios.post('/auth/v1/generate-otp', { email })
}

export const verifyOtp = (email: string, otp: string) => {
    return axios.post('/auth/v1/verify-otp', { email, otp })
}

export const logout = () => {
    return axios.post('/auth/v1/logout')
}

export const getMe = () => {
    return axios.get('/auth/v1/me')
}

export const getUserByInterviews = (userId: string) => {
    return axios.get(`/interview/v1/get-by-user/${userId}`)
}
