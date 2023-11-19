import { Router } from "express";
import { recoverPassword, newUser, LogIn, logOut, verifyToken, edit, verifyPasswordToken, changePassword, getUserById  } from "../controllers/users.controllers.js";
import multer from "multer";
import path from "path";
import teacherRoutes from "./teacher.routes.js";

const router = Router();
router.use("/teachers", teacherRoutes);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
    }
  })
  
  const upload = multer({ storage: storage })

router.post("/recover", recoverPassword);
router.post("/", newUser);
router.post("/login", LogIn)
router.post("/logout", logOut)
router.post("/verify", verifyPasswordToken)
router.post("/change", changePassword)
router.get("/verifytoken", verifyToken);
router.put("/edit/:user_id",upload.single('user_img'), edit);
router.delete("/");
router.get("/:id", getUserById);

export default router;
