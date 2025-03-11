import { Router } from "express";
import controllers from "../controllers/index.js";
import { uploadToCloudinary } from "../utils/upload.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.post(
  "/",
  upload.single("image"),
  uploadToCloudinary,
  controllers.program.addProgram
);
router.get("/", controllers.program.getPrograms);
router.patch(
  "/:id",
  upload.single("image"),
  uploadToCloudinary,
  controllers.program.updateProgram
);
router.get("/:id", controllers.program.getProgram);
router.delete("/:id", controllers.program.deleteProgram);

export default router;
