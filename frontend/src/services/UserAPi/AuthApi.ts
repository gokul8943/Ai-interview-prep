import axios from '../../constants/axios'

export const register = (data:any) =>{
    return axios.post('/auth/sign-up',data)
}
export const login = (data:any) =>{
    return axios.post('/auth/sign-in',data)
}