import { Router } from "express";
import { GetUserById } from "../../usecase/Admin/getUserById";
import { GetUsers } from "../../usecase/Admin/getusers";
import { UserAccess } from "../../usecase/Admin/userAccess";
import { AdminRepositoryImpl } from "../repositories/admin.repositoryImpl";
import userModel from "../../framework/models/user.model";
import { AdminController } from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/requireRole";
import { asyncHandler } from "../../utils/asyncHandler";


const adminRepository = new AdminRepositoryImpl(userModel)
const userAccess = new UserAccess(adminRepository)
const getUsers = new GetUsers(adminRepository)
const getUserById = new GetUserById(adminRepository)
const adminController = new AdminController(userAccess, getUserById, getUsers)

const router = Router()

router.use(authMiddleware, requireRole("admin"))

router.post('/v1/user-access/:id', asyncHandler((req, res) => adminController.userAccess(req, res)))

router.get('/v1/get-user/:userId', asyncHandler((req, res) => adminController.getUserById(req, res)))

router.get('/v1/get-users', asyncHandler((req, res) => adminController.getUsers(req, res)))

export default router
