import express from "express";
import path from "path";
import crypto from "crypto";
import multer from "multer"
import Curso from "../controllers/courseController"
import { Auth } from "../middlewares/autenticador";

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

router.post("/", Auth, Curso.createCourse);
router.get("/", Curso.listAll);

router.get("/procurar-curso", Auth, Curso.listCoursesEnroll);
router.get("/professor/MeusCursos", Auth, Curso.listCoursesFromTeacher);
router.get("/aluno/MeusCursos", Auth, Curso.listCoursesFromStudent);
router.get("/update/:courseId", Auth, Curso.getCourseUpdate);
router.get("/:courseId", Auth, Curso.getCourse);
router.get("/:courseId/entregas/:userId", Auth, Curso.getCourseDeliveries);

//verificar
router.patch("/:courseId/entregas/:userId",
  Auth,
  uploadAtividade.single("file"),
  Curso.updateDeliverieStudent
);

router.get("/:courseId/entregas/atividade/:id", Auth, Curso.getDeliveries);
router.patch("/:courseId", Auth, Curso.update, Curso.updateCascade);
router.delete("/:courseId", Auth, Curso.deletar);
router.get("/:courseId/participantes",
  Auth,
  Curso.listCourseParticipants
);

router.post("/:courseId/matricula", Auth, Curso.enroll);
router.post("/:courseId/desmatricula", Auth, Curso.unroll);
router.get("/download/:urifile", Curso.downloadFile);
//router.get("/cursos/:pesquisa", Auth.auth, Curso.courses);

export default router;
