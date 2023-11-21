import { Router } from "express";
import { getGroups, postGroups, getGroupById, enrollGroup } from "../controllers/groups.controllers.js";

const router = Router();

router.get("/", getGroups);
router.post("/", postGroups);
router.post("/enroll", enrollGroup);
router.get("/:id", getGroupById);

export default router;