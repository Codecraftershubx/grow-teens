import { Router } from "express";
import multer from "multer";

import { uploadToCloudinary } from "../middleware/upload.js";
import {
  // Course endpoints
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  
  // Module endpoints
  createModule,
  updateModule,
  deleteModule,
  getModuleById,
  getModules,
  
  // Content unit endpoints
  createContentUnit,
  
  // Enrollment endpoints
  enrollInCourse,
  unenrollFromCourse,
  getEnrolledCourses,
  
  // Progress tracking
  updateUnitProgress
} from "../controllers/courses.js";

import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const courseRoutes = Router();

// Course routes
courseRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  upload.fields([
    { name: "thumbnail", maxCount: 1 }, 
    { name: "coverImage", maxCount: 1 }
  ]),
  uploadToCloudinary,
  createCourse
);

courseRoutes.get("/", getCourses);

courseRoutes.get("/:id", getCourseById);

courseRoutes.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  upload.fields([
    { name: "thumbnail", maxCount: 1 }, 
    { name: "coverImage", maxCount: 1 }
  ]),
  uploadToCloudinary,
  updateCourse
);

courseRoutes.delete("/:id", [authMiddleware, adminMiddleware], deleteCourse);

// Module routes
courseRoutes.post(
  "/modules",
  [authMiddleware, adminMiddleware],
  upload.single("thumbnail"),
  uploadToCloudinary,
  createModule
);

courseRoutes.put(
  "/modules/:id",
  [authMiddleware, adminMiddleware],
  upload.single("thumbnail"),
  uploadToCloudinary,
  updateModule
);

courseRoutes.delete("/modules/:id", [authMiddleware, adminMiddleware], deleteModule);

courseRoutes.get("/modules/:id", getModuleById);

courseRoutes.get("/modules", getModules);

// Content unit routes
courseRoutes.post(
  "/units",
  [authMiddleware, adminMiddleware],
  upload.single("file"),
  uploadToCloudinary,
  createContentUnit
);

// Enrollment routes
courseRoutes.post("/enroll", authMiddleware, enrollInCourse);

courseRoutes.post("/unenroll", authMiddleware, unenrollFromCourse);

courseRoutes.get("/enrolled", authMiddleware, getEnrolledCourses);

// Progress tracking
courseRoutes.post("/progress/unit", authMiddleware, updateUnitProgress);

export default courseRoutes;
