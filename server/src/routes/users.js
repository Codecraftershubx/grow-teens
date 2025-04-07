import { Router } from "express";
import { getAllUsers } from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const userRoutes = Router();

userRoutes.get("/", [authMiddleware, adminMiddleware], getAllUsers);

export default userRoutes;
