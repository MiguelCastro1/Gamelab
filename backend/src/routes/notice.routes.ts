import express from "express";
import Aviso from "../controllers/noticeController"
import { Auth } from "../middlewares/autenticador";

const router = express.Router();

router.post("/", Auth, Aviso.createNotice);
router.get("/:id", Auth, Aviso.listNoticesFromUser);

export default router;
