import { Router } from "express";
import { getTopics } from "../controllers/topics.controllers.js";

const router = Router();

router.get("/", getTopics);

export default router;
