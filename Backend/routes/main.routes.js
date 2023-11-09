import { Router } from "express";
import userRoutes from "./user.routes.js";
import sessionRoutes from "./session.routes.js";

const router = Router();

router.use("/users",userRoutes);
router.use("/session",sessionRoutes);

export default router;
