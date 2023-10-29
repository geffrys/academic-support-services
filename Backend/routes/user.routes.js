import { Router } from "express";
import { recoverPassword, newUser, LogIn, logOut, verifyToken, edit, getUserById } from "../controllers/users.controllers.js";

const router = Router();

router.post("/recover", recoverPassword);
router.post("/", newUser);
router.post("/login", LogIn)
router.post("/logout", logOut)
router.get("/verify", verifyToken);
router.put("/edit/:user_id", edit);
router.delete("/");
router.get("/:id", getUserById);

export default router;
