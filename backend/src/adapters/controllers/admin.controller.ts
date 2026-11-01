import { Request, Response } from "express";
import { GetUserById } from "../../usecase/Admin/getUserById";
import { GetUsers } from "../../usecase/Admin/getusers";
import { UserAccess } from "../../usecase/Admin/userAccess";


export class AdminController {
    constructor(
        private readonly userAccessUseCase: UserAccess,
        private readonly getUserByIdUseCase: GetUserById,
        private readonly getUsersUseCase: GetUsers,
    ) { }

    async userAccess(req: Request, res: Response) {
        const userId = req.params.id;
        const access = req.body?.access;
        if (!userId || typeof access !== "boolean") {
            return res.status(400).json({ message: "User Id and boolean access are required" });
        }
        try {
            const user = await this.userAccessUseCase.execute(userId, access);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User access updated successfully", user });
        } catch (error) {
            console.error("Error updating user access:", error instanceof Error ? error.message : error);
            return res.status(500).json({ message: "Internal server error in controller" });
        }
    }

    async getUserById(req: Request, res: Response) {
        const userId = req.params.userId
        if (!userId) return res.status(400).json({ message: "User Id is required" });
        try {
            const user = await this.getUserByIdUseCase.execute(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User fetched successfully", user });
        } catch (error) {
            console.error("Error fetching user:", error instanceof Error ? error.message : error);
            return res.status(500).json({ message: "Internal server error in controller" });
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.getUsersUseCase.execute();
            res.status(200).json({ message: "User fetched successfully", users });
        } catch (error) {
            console.error("Error fetching users:", error instanceof Error ? error.message : error);
            return res.status(500).json({ message: "Internal server error in controller" });
        }
    }
}
