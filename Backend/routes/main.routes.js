import { Router } from "express";
import userRoutes from "./user.routes.js";
import SessionRoutes from "./session.routes.js";
import availabilityRoutes from "./availability.routes.js";

const router = Router();

router.use("/users",userRoutes);
router.use("/session",SessionRoutes);
router.use("/availability", availabilityRoutes);


export default router;
