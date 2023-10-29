import { Router } from "express";
import userRoutes from "./user.routes.js";
import topicsRoutes from "./topics.routes.js";
import userTypesRoutes from "./user_types.routes.js";
import idTypesRoutes from "./id_types.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/topics", topicsRoutes);
router.use("/user_types", userTypesRoutes);
router.use("/id_types", idTypesRoutes);

export default router;
