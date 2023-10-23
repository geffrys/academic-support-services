import { Router } from "express";
import { recoverPassword, newUser, LogIn, logOut, verifyToken } from "../controllers/users.controllers.js";

const router = Router();

router.post("/recover", recoverPassword);
router.post("/", newUser);
router.post("/login", LogIn)
router.post("/logout", logOut)
router.get("/verify", verifyToken);
router.put("/");
router.delete("/");

export default router;
