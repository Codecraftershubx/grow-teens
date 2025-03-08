import { Router } from "express";
import controllers from "../controllers/index.js";

const router = Router();

router.post("/signup", controllers.user.add);
router.post("/signin", controllers.user.login);
router.get("/:id", controllers.user.get);

export default router;