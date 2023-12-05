import { Router } from "express";
import {
  getTeachers,
  newTeacher,
  deleteTeacher,
} from "../controllers/teacher_team_controllers.js";

const router = Router();

router.get("/:team_id", getTeachers);
router.post("/", newTeacher);
router.delete("/:team_id/:teacher_id", deleteTeacher);

export default router;