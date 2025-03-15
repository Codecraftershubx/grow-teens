import { Router } from "express";

import {
  createEnrollment,
  getEnrollmentById,
  getEnrollmentStatus,
} from "../controllers/enrollments.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const enrollRoutes = Router();

enrollRoutes.post("/", [authMiddleware], createEnrollment);

enrollRoutes.get("/:userId", [authMiddleware], getEnrollmentById);

enrollRoutes.get("/:userId/:courseId", getEnrollmentStatus);

export default enrollRoutes;
