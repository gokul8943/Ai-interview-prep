import axios from '../../constants/axios'

export const register = (data:any) =>{
    return axios.post('/user/sign-up',data)
}
export const login = (data:any) =>{
    return axios.post('/user/sign-in',data)
}