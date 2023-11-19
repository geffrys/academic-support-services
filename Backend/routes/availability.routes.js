import { Router } from "express";
import { getUserAvailability, newAvailability, editAvailability, deleteAvailability } from '../controllers/availability.controllers.js';

const router = Router();

router.get("/:user_id", getUserAvailability);
router.post("/", newAvailability);
router.put("/edit/:availability_id", editAvailability);
router.delete("/delete/:availability_id", deleteAvailability);

export default router;