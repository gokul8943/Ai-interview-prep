import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignUp } from "../../usecase/Auth/SignUp";
import { Login } from "../../usecase/Auth/Login";
import { GenerateOtp } from "../../usecase/Auth/GenerateOtp";
import { VerifyOtp } from "../../usecase/Auth/VerifyOtp";
import { generateOtp } from "../../utils/generateOtp";
import { sendOtpEmail } from "../../utils/sendOtpEmail";

const jwtSecret: any = process.env.JWT_SECRET;

export class AuthController {
    constructor(
        private signUpUseCase: SignUp,
        private loginUseCase: Login,
        private generateOtpUseCase: GenerateOtp,
        private verifyOtpUseCase: VerifyOtp
    ) {}

    async signUp(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const existingUser = await this.loginUseCase.execute(email);
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await this.signUpUseCase.execute({
                ...req.body,
                password: encryptedPassword,
            });

//             const otp = generateOtp()
//             const sendOtp =  sendOtpEmail(email, otp)
//             const generate = await this.generateOtpUseCase.execute(email,otp);

            return res.status(201).json({ message: "User registered. Verify OTP sent to email.", user });

        } catch (error) {
            console.error("Signup Error:", error);
            return res.status(500).json({ message: "Internal server error in controller" });
        }
    }

    async verifyOtp(req: Request, res: Response) {
        try {
            const { email, otp } = req.body;

            if (!email || !otp) {
                return res.status(400).json({ message: "Email and OTP are required" });
            }

            await this.verifyOtpUseCase.execute(email, otp);

            return res.status(200).json({ message: "OTP verification successful" });
        } catch (error:any) {
            console.error("OTP Verification Error:", error);
            return res.status(400).json({ message: error.message || "OTP verification failed" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const user = await this.loginUseCase.execute(email);
            if (!user) {
                return res.status(404).json({ message: `No user with email ${email}` });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
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
