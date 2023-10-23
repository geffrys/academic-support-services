import { Router } from "express";
import { recoverPassword, newUser, LogIn, logOut, verifyToken, edit, verifyPasswordToken, changePassword } from "../controllers/users.controllers.js";

const router = Router();

router.post("/recover", recoverPassword);
router.post("/", newUser);
router.post("/login", LogIn)
router.post("/logout", logOut)
router.post("/verify", verifyPasswordToken)
router.post("/change", changePassword)
router.get("/verify", verifyToken);
router.put("/edit/:user_id", edit);
router.delete("/");

export default router;
