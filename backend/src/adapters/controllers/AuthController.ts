import { Request,Response } from "express";

import { SignUp } from "../../usecase/Auth/SignUp";



export class AuthController {
  constructor(
    private signUpUseCase: SignUp
  ) { }

  async signUp(req: Request, res: Response) {
    try {
        
    } catch (error) {
        
    }
  }
}