import {Router} from "express";
import {getTeacherById, getTeachers} from "../controllers/teachers.controllers.js";

const router = Router();

router.get("/", getTeachers);
router.get("/:id", getTeacherById);

export default router;