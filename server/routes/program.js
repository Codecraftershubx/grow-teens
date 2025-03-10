import { Router } from "express";
import controllers from "../controllers/index.js";

const router = Router();

router.post("/", controllers.program.addProgram);
router.get("/", controllers.program.getPrograms);
router.get("/:id", controllers.program.getProgram);
router.delete("/:id", controllers.program.deleteProgram);

export default router;