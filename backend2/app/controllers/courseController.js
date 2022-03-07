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

exports.listCourse = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let autor = parseJwt(token).email;
  try {
    var busca = req.query.pesquisa;
    const doc = await Course.find({
      $or: [
        { nomeCurso: { $regex: "(?i).*" + busca + ".*(?i)" } },
        { descricao: { $regex: "(?i).*" + busca + ".*(?i)" } },
      ],
    });
    let encontrados = Object.keys(doc).length;
    let newDoc = doc.filter(({ autorEmail }) => autorEmail === autor);
    res.status(200).json({
      message: `Foram encontrados ${encontrados} resultados.`,
      newDoc,
    });
  } catch (err) {
    res.status(500).json({
      message: "Algo deu errado, tente novamente mais tarde.",
    });
  }
};

exports.list = async (req, res) => {
  try {
    const doc = await Course.find({});
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};
