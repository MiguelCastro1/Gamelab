const express = require("express");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const wayPath = path.resolve("public/avatar");
const wayPathAtividades = path.resolve("public/atividades");
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

const multerConfigAtividade = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, wayPathAtividades);
  },
  filename: (req, file, cb) => {
    let filename = crypto.randomBytes(4).toString("hex");
    let extensionFile = file.originalname.slice(
      file.originalname.lastIndexOf(".")
    );
    cb(null, `${filename}-${file.originalname}`);
  },
});

const upload = multer({ storage: multerConfig });
const uploadAtividade = multer({ storage: multerConfigAtividade });

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

router.get("/usuarios/:id/quadro", auth, Usuario.getBoard);
router.patch("/usuarios/:id/quadro", auth, Usuario.updateBoard);

router.patch(
  "/usuarios/avatar/:id",
  upload.single("file"),
  Usuario.uploadAvatar
);
router.get("/usuarios/avatar/:id", auth, Usuario.getUserImage);

//Recuperar senha
router.post("/envioemail", Usuario.sendRecoverEmail);
router.patch("/resetarsenha", Usuario.resetPassword);

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
router.get(
  "/cursos/:courseId/entregas/:userId",
  auth,
  Curso.getCourseDeliveries
);

router.patch(
  "/cursos/:courseId/entregas/:userId",
  auth,
  uploadAtividade.single("file"),
  Curso.updateDeliverie
);
router.get("/cursos/:courseId/entregas/atividade/:id", auth, Curso.getDeliveries);

router.patch("/cursos/:courseId", auth, Curso.update, Curso.updateCascade);
router.delete("/cursos/:courseId", auth, Curso.delete);
router.get(
  "/cursos/:courseId/participantes",
  auth,
  Curso.listCourseParticipants
);
router.post("/cursos/:courseId/matricula", auth, Curso.enroll);
router.post("/cursos/:courseId/desmatricula", auth, Curso.unroll);

router.get("/download/:urifile", Curso.downloadFile);

module.exports = router;
