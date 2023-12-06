import { Router } from "express";
import userRoutes from "./user.routes.js";
import userTypesRoutes from "./user_types.routes.js";
import idTypesRoutes from "./id_types.routes.js";
import topicsRoutes from "./topics.routes.js";
import SessionRoutes from "./session.routes.js";
import availabilityRoutes from "./availability.routes.js";
import sessionTypesRoutes from "./session_type.routes.js";
import groupsRoutes from "./groups.routes.js";
import singleGroup from './singlegroup.routes.js'
import teamRoutes from "./team.routes.js";
import teacherTeam from "./teacher_team.routes.js";

const router = Router();

router.use("/users",userRoutes);
router.use("/user_types", userTypesRoutes);
router.use("/id_types", idTypesRoutes);
router.use("/session_types", sessionTypesRoutes);
router.use("/groups", groupsRoutes);
router.use("/singlegroup", singleGroup);
router.use("/sessions", SessionRoutes);
router.use("/topics", topicsRoutes);
router.use("/availability", availabilityRoutes);
router.use("/team", teamRoutes);


export default router;
