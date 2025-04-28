import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        if (tokenDecode && tokenDecode.id) {
            req.body.userId = tokenDecode.id; 
            return next();
        } else {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }
    } catch (error: any) {
        console.error("JWT verification error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default userAuth;