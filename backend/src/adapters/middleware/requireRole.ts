import { RequestHandler } from "express";

export const requireRole = (...roles: string[]): RequestHandler => {
    return (req, res, next) => {
        const role = req.user?.role;
        if (!role || !roles.includes(role)) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        next();
    };
};
