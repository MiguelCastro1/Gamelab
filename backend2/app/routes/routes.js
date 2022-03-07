const express = require("express");
const router = express.Router();

const Usuario = require("../controllers/userController");
const Curso = require("../controllers/courseController");
require("../middlewares/autenticador");

//Usuário
router.post("/usuarios", Usuario.createUser);

router.post("/login", Usuario.login);

//Cursos
router.post("/cursos", auth, Curso.createCourse);
router.get("/cursos", auth, Curso.listCourse);

module.exports = router;
