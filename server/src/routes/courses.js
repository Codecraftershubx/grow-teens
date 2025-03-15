import { Router } from "express";
import multer from "multer";

import { uploadToCloudinary } from "../middleware/upload.js";
import {
  createModule,
  updateModule,
  deleteModule,
  getModuleById,
  getModules,
} from "../controllers/courses.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const courseRoutes = Router();

courseRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  upload.single("image"),
  uploadToCloudinary,
  createModule
);

courseRoutes.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  upload.single("image"),
  uploadToCloudinary,
  updateModule
);

courseRoutes.delete("/:id", [authMiddleware, adminMiddleware], deleteModule);

courseRoutes.get("/:id", [authMiddleware], getModuleById);

courseRoutes.get("/", [authMiddleware], getModules);

export default courseRoutes;
