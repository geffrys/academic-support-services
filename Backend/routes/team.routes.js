import { Router } from "express";
import { getTeam } from '../controllers/team.controllers.js';
import teacherTeam from "./teacher_team.routes.js";

const router = Router();
router.use("/teacherTeam", teacherTeam);

router.get("/:admin_id", getTeam);

export default router;