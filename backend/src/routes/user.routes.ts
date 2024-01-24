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

router.post("/", Usuario.create);
router.get("/",Auth, Usuario.get_all);
router.get("/:id", Auth, Usuario.login);
router.patch("/:id", Auth, Usuario.update);

//router.get("/:id/quadro")
//router.patch("/:id/quadro")

router.patch("/avatar/:id",
  upload.single("file"),
  Usuario.upload_avatar
);

router.get("/avatar/:id", Auth, Usuario.get_image_avatar);

export default router;
