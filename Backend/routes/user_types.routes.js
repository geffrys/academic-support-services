import { Router } from "express";
import { getUserTypes } from "../controllers/user_types.controllers.js";

const router = Router();

router.get("/", getUserTypes);

export default router;
