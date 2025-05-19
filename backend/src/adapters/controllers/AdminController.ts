import { Request, Response } from "express";
import { GetUserById } from "../../usecase/Admin/GetUserById";
import { GetUsers } from "../../usecase/Admin/Getusers";
import { userAccess } from "../../usecase/Admin/UserAccess";


export class AdminController {
    constructor(
        private readonly userAccessUseCase: userAccess,
        private readonly getUserByIdUseCase: GetUserById,
        private readonly getUsersUseCase: GetUsers,
    ) { }

    async userAccess(req: Request, res: Response) {
        const userId = req.params.id;
        const access = req.body.access;
        try {
            const user = await this.userAccessUseCase.execute(userId, access);
            res.status(200).json({ message: "User access updated successfully", user });
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(req: Request, res: Response) {
        const userId = req.params.id;
        try {
            const user = await this.getUserByIdUseCase.execute(userId);
            res.status(200).json({ message: "User fetched successfully", user });
        } catch (error) {
            console.log("internal server error", error);
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.getUsersUseCase.execute();
            res.status(200).json({ message: "User fetched successfully", users });
        } catch (error) {
            console.log(error);
        }
    }
}