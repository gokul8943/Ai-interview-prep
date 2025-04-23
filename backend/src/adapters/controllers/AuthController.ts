import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import { SignUp } from "../../usecase/Auth/SignUp";
import { Login } from "../../usecase/Auth/Login";

const jwtSecret: any = process.env.JWT_SECRET
export class AuthController {
    constructor(
        private signUpUseCase: SignUp,
        private loginUseCase: Login
    ) { }

    async signUp(req: Request, res: Response) {
        try {
            const userData = req.body;
            const { name, email, password } = userData;

            if ( !name ||!email || !password ) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const existingUser = await this.loginUseCase.execute(email);

            if (existingUser !== null) {
                return res.status(409).json({ message: "User already exists" });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = await this.signUpUseCase.execute({
                ...userData,
                password: encryptedPassword,
            });

            return res.status(201).json({ message: "User registered successfully", user });
        } catch (error) {
            console.error("Signup Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async Login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            console.log(req.body);
            

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const user = await this.loginUseCase.execute(email);
            if (!user) {
                return res.status(406).json({ message: `No user with email ${email}` });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(406).json({ message: "Wrong password" });
            }

            const accessToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '30m' });
            const refreshToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '30d' });

            const { password: _, ...userWithoutPassword } = user.toObject?.() || user;

            return res.status(200).json({
                message: "Login successful",
                accessToken,
                refreshToken,
                user: userWithoutPassword
            });

        } catch (error) {
            console.error("Login Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
