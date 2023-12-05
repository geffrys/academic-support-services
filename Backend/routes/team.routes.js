import { Router } from "express";
import { getTeam} from '../controllers/team.controllers.js';

const router = Router();

router.get("/:admin_id", getTeam);

export default router;