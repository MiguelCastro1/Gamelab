import express from "express";
import User from "./user.routes"
import Course from "./course.routes"
import Notice from "./notice.routes"
import Usuario from "../controllers/userController"

const router = express.Router();

router.get("/", (req, res) => {
    res.send('Hello World');
});

router.post("/login", Usuario.login);
router.post("/envioemail", Usuario.sendmail);
router.patch("/resetarsenha", Usuario.resetSenha);
router.get("/script", Usuario.scriptUpdate);

router.use("/usuarios", User);
router.use("/cursos", Course);
router.use("/avisos", Notice);

export default router;
