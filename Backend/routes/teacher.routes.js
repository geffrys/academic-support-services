import {Router} from "express";
import {getTeacherById, getTeachers, getTeacherGroupsById} from "../controllers/teachers.controllers.js";

const router = Router();

router.get("/", getTeachers);
router.get("/:id", getTeacherById);
router.get("/:id/groups", getTeacherGroupsById);

export default router;