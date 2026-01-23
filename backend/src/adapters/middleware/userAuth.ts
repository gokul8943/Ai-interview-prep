import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware: RequestHandler = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return;
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as { userId: string };

        if (!decoded?.userId) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }

        req.user = { userId: decoded.userId };
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
