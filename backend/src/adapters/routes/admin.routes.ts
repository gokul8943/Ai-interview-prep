import { Router } from "express";
import { GetUserById } from "../../usecase/Admin/getUserById";
import { GetUsers } from "../../usecase/Admin/getusers";
import { UserAccess } from "../../usecase/Admin/userAccess";
import { AdminRepositoryImpl } from "../repositories/admin.repositoryImpl";
import userModel from "../../framework/models/user.model";
import { AdminController } from "../controllers/admin.controller";



const adminRepository = new AdminRepositoryImpl(userModel)
const userAccess = new UserAccess(adminRepository)
const getUsers = new GetUsers(adminRepository)
const getUserById = new GetUserById(adminRepository)
const adminController = new AdminController(userAccess, getUserById, getUsers)

const router = Router()

router.post('/v1/user-access/:id', async (req, res) => {
    try {
        adminController.userAccess(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})

router.get('/v1/get-user/:userId', async (req, res) => {
    try {
        adminController.getUserById(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})

router.get('/v1/get-users', async (req, res) => {
    try {
        adminController.getUsers(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})

export default router