const mongoose = require("mongoose");
const { parseJwt } = require("../middlewares/decodedToken");
const Course = mongoose.model("Course");

exports.createCourse = async (req, res) => {
  try {
    console.log(req.body);
    let document = await Course.create(req.body);
    console.log('done');
    res.status(200).json({
      document,
      message: `Curso ${req.body.nomeCurso} cadastrado com sucesso`,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

//listar cursos para professor, dentre os quais é autor - permite pesquisa por: nome do curso e descrição.
exports.listCoursesFromTeacher = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let autor = parseJwt(token).email;
  try {
    let busca = req.query.pesquisa || "";
    let fields = {
      _id: 0
    }
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

//listar cursos para estudante, dentre os quais está matriculado - permite pesquisa por nome do curso, e descrição.
exports.listCoursesFromStudent = async (req, res) => {
  try {    
    let token = req.headers.authorization.split(" ")[1];
    let studentId = mongoose.Types.ObjectId( parseJwt(token).id);
    let busca = req.query.pesquisa || "";
    let fields = {
      _id: 0
    }
    const doc = await Course.find({
      $or: [
        { nomeCurso: { $regex: "(?i).*" + busca + ".*(?i)" } },
        { descricao: { $regex: "(?i).*" + busca + ".*(?i)" } },
      ],
      "Alunos.userId": studentId
    },
      fields
    );
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

exports.listCoursesEnroll = async (req, res) => {
  try{  

    let token = req.headers.authorization.split(" ")[1];
    let studentId = parseJwt(token).id;
    const doc = await Course.find({})
    
    //carregar cursos que aluno nao esteja matriculado
    let results = [];
    for(let i =0; i < doc.length; i++){
      let matriculado = false
      if(doc[i].Alunos){
        for(let j=0; j < doc[i].Alunos.length; j++){
          if(doc[i].Alunos[j].userId == studentId){
            matriculado = true
          }
        }
      }
      if(!matriculado) results.push(doc[i])
    }
    
  //const results = doc.filter((turma) => turma.Alunos.filter((alunos) => studentId !== alunos.userId))
    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
  }
};

exports.listAll = async (req, res) => {
  try {
    const doc = await Course.find({});
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};


