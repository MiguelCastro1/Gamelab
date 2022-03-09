const express = require("express");
const router = express.Router();

const Usuario = require("../controllers/userController");
const Curso = require("../controllers/courseController");
require("../middlewares/autenticador");

//Usuário
router.post("/usuarios", Usuario.createUser);
router.post("/login", Usuario.login);
router.get("/usuarios", Usuario.list);

//Cursos
router.post("/cursos", auth, Curso.createCourse);
router.get("/cursos/:pesquisa", auth, Curso.listCourse);
router.get("/cursos", auth, Curso.list);

module.exports = router;
