import { Router } from "express";
import { getUser } from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";

const userRoutes = Router();

userRoutes.get("/", [authMiddleware], getUser);

export default userRoutes;
