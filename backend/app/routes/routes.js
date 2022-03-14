const express = require("express");
const router = express.Router();

const Usuario = require("../controllers/userController");
const Curso = require("../controllers/courseController");
require("../middlewares/autenticador");

//Usuário
router.post("/login", Usuario.login);
router.post("/usuarios", Usuario.createUser);
router.get("/usuarios", Usuario.listAll);
router.get("/usuarios/:id", Usuario.user);
router.put("/usuarios/:id", auth,Usuario.update);

//Cursos
router.post("/cursos", auth, Curso.createCourse);
router.get("/cursos/:pesquisa", auth, Curso.courses);
router.get("/cursos", auth, Curso.listAll);
router.put("/cursos/:id", auth, Curso.update);
router.put("/matricula",auth,Curso.matricular);

module.exports = router; 
