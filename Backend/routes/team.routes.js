import { Router } from "express";
import { getTeam} from '../controllers/team.controllers.js';

const router = Router();

router.get("/", getTeam);

export default router;