import { AuthRepository } from "../../adapters/interfaces/AuthRepository"


export class SignUp{
    constructor(private authRepository:AuthRepository){
        async execute(){
           return this.authRepository.signUp()
        }
    }
}