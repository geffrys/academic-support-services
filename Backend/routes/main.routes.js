import { Router } from "express";
import userRoutes from "./user.routes.js";
import SessionRoutes from "./session.routes.js";

const router = Router();

router.use("/users",userRoutes);
router.use("/session",SessionRoutes);


export default router;
