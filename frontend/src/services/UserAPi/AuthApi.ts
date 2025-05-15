import axios from '@/constants/Axios'

export const register = (data:any) =>{
    return axios.post('/auth/sign-up',data)
}
export const login = (data:any) =>{
    return axios.post('/auth/sign-in',data)
}
export const sendOtp = (email:any) =>{
    return axios.post('/auth/generate-otp',{email})
}

export const verifyOtp = (email:string,otp:any) =>{    
    return axios.post('/auth/verify-otp',{email,otp})
}