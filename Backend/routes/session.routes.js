import { Router } from "express";
import {deleteSession} from "../controllers/session.controlers.js";

const router = Router();

router.delete("/:id", deleteSession)

export default router;