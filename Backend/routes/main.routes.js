import { Router } from "express";
import userRoutes from "./user.routes.js";
import topicsRoutes from "./topics.routes.js";
import userTypesRoutes from "./user_types.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/topics", topicsRoutes);
router.use("/user_types", userTypesRoutes);

export default router;
