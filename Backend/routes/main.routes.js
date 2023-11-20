import { Router } from "express";
import userRoutes from "./user.routes.js";
import topicsRoutes from "./topics.routes.js";
import userTypesRoutes from "./user_types.routes.js";
import idTypesRoutes from "./id_types.routes.js";
import sessionTypesRoutes from "./session_type.routes.js";
import groupsRoutes from "./groups.routes.js";
import sessionRoutes from './session.routes.js'

const router = Router();

router.use("/users", userRoutes);
router.use("/topics", topicsRoutes);
router.use("/user_types", userTypesRoutes);
router.use("/id_types", idTypesRoutes);
router.use("/session_types", sessionTypesRoutes);
router.use("/groups", groupsRoutes);
router.use("/sessions", sessionRoutes);

export default router;
