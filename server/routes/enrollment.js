import { Router } from "express";
import controllers from "../controllers/index.js";

const router = Router();

router.post("/", controllers.enrollment.addEnrollment);
router.get("/", controllers.enrollment.getEnrollments);
router.get("/:id", controllers.enrollment.getEnrollment);
router.get("/:userId/:programId", controllers.enrollment.getEnrolled);

export default router;