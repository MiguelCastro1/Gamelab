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
router.patch("/usuarios/:id", auth, Usuario.update);

//Cursos
router.post("/cursos", auth, Curso.createCourse);
router.post("/cursos/:id/matricula", auth, Curso.enroll);
//router.get("/cursos/:pesquisa", auth, Curso.courses);
router.get("/cursos", Curso.listAll);
router.get("/cursos/procurar", auth,  Curso.listCoursesEnroll);
router.get("/cursos/professor/MeusCursos", auth,  Curso.listCoursesFromTeacher);
router.get("/cursos/aluno/MeusCursos", auth,  Curso.listCoursesFromStudent);
router.put("/cursos/:id", auth, Curso.update);
router.get("/cursos/:id/participantes", auth, Curso.listCourseParticipants);

module.exports = router;
