import { Router } from "express";
import multer from "multer";

import { uploadToCloudinary } from "../middleware/upload.js";
import {
  createEnrollment,
  getEnrollmentById,
} from "../controllers/enrollments.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const enrollRoutes = Router();

enrollRoutes.post("/", [authMiddleware], createEnrollment);

enrollRoutes.get("/:userId", [authMiddleware], getEnrollmentById);

export default enrollRoutes;
