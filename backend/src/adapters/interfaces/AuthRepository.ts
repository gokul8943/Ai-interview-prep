

export interface AuthRepository {
    signUp(userData:any): Promise<any>
    Login(email:string): Promise<any>
}