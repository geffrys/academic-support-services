import { Router } from "express";
import { getIdTypes } from "../controllers/id_types.controllers.js";

const router = Router();

router.get("/", getIdTypes);

export default router;
