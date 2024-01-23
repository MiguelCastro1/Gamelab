import express from "express";
import path from "path";
import crypto from "crypto";
import multer from "multer"
import Usuario from "../controllers/userController"
import { Auth } from "../middlewares/autenticador";

const router = express.Router();
const wayPath = path.resolve("public/avatar");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, wayPath);
  },
  filename: (req, file, cb) => {
    let filename = crypto.randomBytes(16).toString("hex");
    let extensionFile = file.originalname.slice(
      file.originalname.lastIndexOf(".")
    );
    cb(null, `${filename}${extensionFile}`);
  },
});

const upload = multer({ storage: multerConfig });

router.post("/", Usuario.createUser);
router.get("/",Auth, Usuario.listAll);
router.get("/:id", Auth, Usuario.user);
router.patch("/:id", Auth, Usuario.update);

//router.get("/:id/quadro")
//router.patch("/:id/quadro")

router.patch("/avatar/:id",
  upload.single("file"),
  Usuario.uploadAvatar
);

router.get("/avatar/:id", Auth, Usuario.getImageAvatar);

export default router;
