import express from "express";

import Aviso from "../controllers/noticeController"
import Auth from "../middlewares/autenticador";

const router = express.Router();

router.post("/", Auth.auth, Aviso.createNotice);
router.get("/:id", Auth.auth, Aviso.listNoticesFromUser);

export default router;
