import { Router } from "express";
import { GetUserById } from "../../usecase/Admin/GetUserById";
import { GetUsers } from "../../usecase/Admin/Getusers";
import { UserAccess } from "../../usecase/Admin/UserAccess";
import { AdminRepositoryImpl } from "../repositories/AdminRepositoryImpl";
import userModel from "../../framework/models/userModel";
import { AdminController } from "../controllers/AdminController";



const adminRepository = new AdminRepositoryImpl(userModel)
const userAccess = new UserAccess(adminRepository)
const getUsers = new GetUsers(adminRepository)
const getUserById = new GetUserById(adminRepository)
const adminController = new AdminController(userAccess,getUserById,getUsers)

const router = Router()

router.post('/user-access/:id', async (req, res) => {
    try {
        adminController.userAccess(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})

router.get('/get-user/:id', async (req, res) => {
    try {
        adminController.getUsers(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})

router.get('/get-users', async (req, res) => {
    try {
        adminController.getUsers(req, res)
    } catch (error) {
        res.status(500).json({ message: "Error in routes", error })
    }
})

export default router