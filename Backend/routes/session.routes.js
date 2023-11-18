import { Router } from "express";
import {deleteSession} from "../controllers/session.controlers.js";

const router = Router();

router.delete("/:session_id", deleteSession)

export default router;