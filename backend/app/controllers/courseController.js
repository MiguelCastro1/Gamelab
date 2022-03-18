const mongoose = require("mongoose");
const { parseJwt } = require("../middlewares/decodedToken");
const Course = mongoose.model("Course");

exports.createCourse = async (req, res) => {
  try {
    let document = await Course.create(req.body);
    res.status(200).json({
      document,
      message: `Curso ${req.body.nomeCurso} cadastrado com sucesso`,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

//listar cursos - pesquisa pode ser: usuario, string de busca, ativo, ano.
exports.listCoursesFromTeacher = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let autor = parseJwt(token).email;
  try {
    var busca = req.query.pesquisa;
    const doc = await Course.find({
      $or: [
        { nomeCurso: { $regex: "(?i).*" + busca + ".*(?i)" } },
        { descricao: { $regex: "(?i).*" + busca + ".*(?i)" } },
      ],
      // para o professor enxergar apenas os cursos criados por ele
      autorEmail: autor,
    });
    let encontrados = Object.keys(doc).length;
    // let newDoc = doc.filter(({ autorEmail }) => autorEmail === autor);
    res.status(200).json({
      message: `Foram encontrados ${encontrados} resultados.`,
      doc,
    });
  } catch (err) {
    res.status(500).json({
      message: "Algo deu errado, tente novamente mais tarde.",
    });
  }
};

exports.listCoursesForStudents = async (req, res) => {
  try {
    let busca = req.query.pesquisa || "";
    const doc = await Course.find({
      $or: [
        { nomeCurso: { $regex: "(?i).*" + busca + ".*(?i)" } },
        { descricao: { $regex: "(?i).*" + busca + ".*(?i)" } },
        { autorEmail: { $regex: "(?i).*" + busca + ".*(?i)" } },
      ],
    });
    let encontrados = Object.keys(doc).length;
    res.status(200).json({
      message: `Foram encontrados ${encontrados} resultados.`,
      doc,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.enroll = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let object = parseJwt(token);
    let userId = object.id;
    let courseId = req.params.id;
    let aluno = {
      userId: new mongoose.Types.ObjectId(userId),
      notas: [],
    };
    let document = await Course.updateOne(
      { _id: courseId },
      { $push: { Alunos: aluno } }
    );
    res.status(200).json({
      document,
      message: `Aluno matriculado com sucesso`,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.update = async (req, res) => {};

exports.listCourseParticipants = async (req, res) => {
  try {
    let courseId = req.params.id;
    let fields = {
      Alunos: 1,
      _id: 0,
    };

    const doc = await Course.findById(courseId)
      .populate("Alunos")
      .select(fields);
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};
