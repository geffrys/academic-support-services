import { Router } from "express";
import { getUserAvailability, newAvailability, editAvailability, deleteAvailability } from '../controllers/availability.controllers.js';

const router = Router();

router.get("/:user_id", getUserAvailability);
router.post("/", newAvailability);
router.put("/:availability_id", editAvailability);
router.delete("/:availability_id", deleteAvailability);

export default router;