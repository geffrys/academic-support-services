import { Router } from "express";
import {
  getTeachers,
  getTeacherById,
  newTeacher,
  deleteTeacher,
} from "../controllers/teacher_team_controllers.js";

const router = Router();

router.get("/", getTeachers);
router.post("/", newTeacher);
router.delete("/:id", deleteTeacher);

export default router;t