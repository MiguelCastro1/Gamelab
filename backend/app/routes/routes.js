const express = require("express");
const router = express.Router();

const Usuario = require("../controllers/userController");
const Curso = require("../controllers/courseController");
const Aviso = require("../controllers/noticeController");

require("../middlewares/autenticador");

//Usuário
router.post("/login", Usuario.login);
router.post("/usuarios", Usuario.createUser);
router.get("/usuarios", Usuario.listAll);
router.get("/usuarios/:id", auth, Usuario.user);
router.patch("/usuarios/:id", auth, Usuario.update);

//Cursos
router.post("/cursos", auth, Curso.createCourse);
router.get("/cursos", Curso.listAll);

router.post("/avisos", auth, Aviso.createNotice);
router.get("/avisos/:id", auth, Aviso.listNoticesFromUser);

//router.get("/cursos/:pesquisa", auth, Curso.courses);
router.get("/cursos/procurar-curso", auth,  Curso.listCoursesEnroll);
router.get("/cursos/professor/MeusCursos", auth,  Curso.listCoursesFromTeacher);
router.get("/cursos/aluno/MeusCursos",  auth, Curso.listCoursesFromStudent);
router.get("/cursos/:courseId",auth, Curso.getCourse);
router.put("/cursos/:courseId",auth, Curso.update);
router.get("/cursos/:courseId/participantes", auth,Curso.listCourseParticipants);
router.post("/cursos/:courseId/matricula", auth, Curso.enroll);
router.post("/cursos/:courseId/desmatricula", auth, Curso.unroll);

module.exports = router;
