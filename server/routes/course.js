import { Router } from "express";

import controllers from "../controllers/index.js";
import { uploadToCloudinary } from "../utils/upload.js";
import multer from "multer";

const storage = multer.memoryStorage();  
const upload = multer({ storage: storage }); 

const router = Router();

router.post("/",  upload.single('image'), uploadToCloudinary, controllers.course.addCourse);
router.get("/", controllers.course.getCourses);
router.get("/:id", controllers.course.getCourse);

export default router;