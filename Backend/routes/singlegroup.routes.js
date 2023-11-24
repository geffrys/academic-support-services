import { Router } from "express";
import { getGroups} from "../controllers/singlegroup.controllers.js";

const router = Router();

router.get("/", getGroups);

export default router;