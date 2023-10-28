import { Router } from "express";
import userRoutes from "./user.routes.js";
import topicsRoutes from "./topics.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/topics", topicsRoutes);

export default router;
