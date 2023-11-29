import express from "express";
import path from "path";
import crypto from "crypto";
import multer from "multer"
import Curso from "../controllers/courseController"
import Auth from "../middlewares/autenticador";
require("../middlewares/autenticador");

const router = express.Router();

const wayPathAtividades = path.resolve("public/atividades");

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

const uploadAtividade = multer({ storage: multerConfigAtividade });

router.post("/", Auth.auth, Curso.createCourse);
router.get("/", Curso.listAll);

router.get("/procurar-curso", Auth.auth, Curso.listCoursesEnroll);
router.get("/professor/MeusCursos", Auth.auth, Curso.listCoursesFromTeacher);
router.get("/aluno/MeusCursos", Auth.auth, Curso.listCoursesFromStudent);
router.get("/update/:courseId", Auth.auth, Curso.getCourseUpdate);
router.get("/:courseId", Auth.auth, Curso.getCourse);
router.get("/:courseId/entregas/:userId",
  Auth.auth,
  Curso.getCourseDeliveries
);

//verificar
router.patch("/:courseId/entregas/:userId",
  Auth.auth,
  uploadAtividade.single("file"),
  Curso.updateDeliverieStudent
);

router.get("/:courseId/entregas/atividade/:id", Auth.auth, Curso.getDeliveries);
router.patch("/:courseId", Auth.auth, Curso.update, Curso.updateCascade);
router.delete("/:courseId", Auth.auth, Curso.deletar);
router.get("/:courseId/participantes",
  Auth.auth,
  Curso.listCourseParticipants
);

router.post("/:courseId/matricula", Auth.auth, Curso.enroll);
router.post("/:courseId/desmatricula", Auth.auth, Curso.unroll);
router.get("/download/:urifile", Curso.downloadFile);
//router.get("/cursos/:pesquisa", Auth.auth, Curso.courses);

export default router;
