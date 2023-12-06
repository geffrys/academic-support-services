import { Router } from "express";
import {
  getTeachersTeam,
  newTeacherTeam,
  deleteTeacherTeam,
} from "../controllers/teacher_team_controllers.js";

const router = Router();

router.get("/:team_id", getTeachersTeam);
router.post("/", newTeacherTeam);
router.delete("/:team_id/:teacher_id", deleteTeacherTeam);

export default router;
