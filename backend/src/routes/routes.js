const express = require("express");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const wayPath = path.resolve("public/avatar");
const multer = require("multer");

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

const Usuario = require("../controllers/userController");
const Curso = require("../controllers/courseController");
const Aviso = require("../controllers/noticeController");

require("../middlewares/autenticador");

//Usuário

router.post("/teste", (req, res) => {
  res.send("teste!!");
});

router.post("/login", Usuario.login);
router.post("/usuarios", Usuario.createUser);
router.get("/usuarios", auth, Usuario.listAll);
router.get("/usuarios/:id", auth, Usuario.user);
router.patch("/usuarios/:id", auth, Usuario.update);

router.patch(
  "/usuarios/avatar/:id",
  upload.single("file"),
  Usuario.uploadAvatar
);
router.get("/usuarios/avatar/:id", auth, Usuario.getImageAvatar);

//Recuperar senha
router.post("/envioemail", Usuario.sendmail);
router.patch("/resetarsenha", Usuario.resetSenha);

router.get("/script", Usuario.scriptUpdate);

//Cursos
router.post("/cursos", auth, Curso.createCourse);
router.get("/cursos", Curso.listAll);

router.post("/avisos", auth, Aviso.createNotice);
router.get("/avisos/:id", auth, Aviso.listNoticesFromUser);

//router.get("/cursos/:pesquisa", auth, Curso.courses);
router.get("/cursos/procurar-curso", auth, Curso.listCoursesEnroll);
router.get("/cursos/professor/MeusCursos", auth, Curso.listCoursesFromTeacher);
router.get("/cursos/aluno/MeusCursos", auth, Curso.listCoursesFromStudent);
router.get("/cursos/update/:courseId", auth, Curso.getCourseUpdate);
router.get("/cursos/:courseId", auth, Curso.getCourse);
router.get("/cursos/:courseId/entregas/:userId", auth, Curso.getCourseDeliveries);

router.patch("/cursos/:courseId", auth, Curso.update, Curso.updateCascade);
router.delete("/cursos/:courseId", auth, Curso.delete);
router.get(
  "/cursos/:courseId/participantes",
  auth,
  Curso.listCourseParticipants
);
router.post("/cursos/:courseId/matricula", auth, Curso.enroll);
router.post("/cursos/:courseId/desmatricula", auth, Curso.unroll);

module.exports = router;
