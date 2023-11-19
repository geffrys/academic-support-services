import { Router } from "express";
import { getGroups, postGroups, getGroupById } from "../controllers/groups.controllers.js";

const router = Router();

router.get("/", getGroups);
router.post("/", postGroups);
router.get("/:id", getGroupById);

export default router;