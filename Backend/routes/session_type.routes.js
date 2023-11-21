import { Router } from "express";
import { getSessionTypes } from "../controllers/session_type.controller.js";

const router = Router();

router.get("/", getSessionTypes);

export default router;