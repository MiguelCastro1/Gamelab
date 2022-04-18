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


exports.getCourse = async (req, res) => {
  try {
    let courseId = req.params.courseId;
    let fields1 = 'nome _id';
    let fields2 = 'nome _id email imageAvatar';
    let doc = await Course.findById(courseId)
      .populate( "autorId", fields1)
      .populate( "Alunos.userId", fields2);
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};

exports.getCourseUpdate = async (req, res) => {
  try {
    let courseId = req.params.courseId;
    let doc = await Course.findById(courseId)
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};

exports.delete = async (req, res) => {
  let courseId = req.params.courseId;
  try {
    let doc = await Course.findByIdAndDelete({ _id: courseId });
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
}

exports.update = async (req, res, next) => {
  //console.log(req.body)
  let courseId = req.params.courseId;
  try {
    let doc = await Course.findOneAndUpdate({ _id: courseId }, req.body);
    console.log({doc})
    //res.status(200).json({ doc });
    next();
  } catch (error) {
    console.error(error);
  }
};

exports.updateCascade = async (req, res) => {
  let courseId = req.params.courseId;
  try {
    let doc = await Course.findOneAndUpdate({ _id: courseId }, req.body);
   
    let atividades = doc.secoes.map((secao => (secao.conteudos.filter(conteudo => conteudo.tipo === 'Atividade')))).filter(atividade => atividade.length > 0)
    console.log({atividades})

    if(atividades.length > 0 && doc.Alunos.length > 0){
      let Alunos = doc.Alunos

      //Adicionar atividades aos alunos
      if(atividades.length > Alunos[0].atividade.length){
        for(let i = 0; i < Alunos.length; i++){
      
        }
        console.log('adicionar atividades')
      }else{
        console.log('Não há novas atividades')
      }
    }
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
}

//listar cursos para professor, dentre os quais é autor - permite pesquisa por: nome do curso e descrição.
exports.listCoursesFromTeacher = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let autor = parseJwt(token).email;
  let fields1 = 'nome _id';
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
    }).populate( "autorId", fields1);
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
    let fields1 = 'nome _id';
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
    }).populate( "autorId", fields1);
   // console.log(doc)
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
    let courseId = req.params.courseId;
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

exports.unroll = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let object = parseJwt(token);
    let userId = object.id;
    let courseId = req.params.courseId;
    let aluno = {
      userId: new mongoose.Types.ObjectId(userId),
      notas: [],
    };

    let document = await Course.updateOne(
     { _id: courseId },
      { $pull: { Alunos: aluno } }
    );
   //console.log(userId)
  // console.log(courseId)
    res.status(200).json({
      document,
      message: `Aluno desmatriculado com sucesso`,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


exports.listCourseParticipants = async (req, res) => {
  try {
    let courseId = req.params.courseId;
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
    res.status(200).send({results});
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

exports.getCourseDeliveries = async (req, res) => {
  try {
    let courseId = req.params.courseId;
    let userId = req.params.userId;
    let fields1 = 'Alunos';
    let doc = await Course.findOne(
      { 
        '_id' : courseId,
        'Alunos' : { $elemMatch : { userId: userId}}
      }, 
      fields1
    );
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};

//atualiza todo content para atividade( content._id) para um aluno( userId) de uma turma( courseId)
exports.updateDeliverie = async (req, res) => {
  try {
    let courseId = mongoose.Types.ObjectId( req.params.courseId);
    let userId = mongoose.Types.ObjectId( req.params.userId);

    let content = {
      _id: new mongoose.Types.ObjectId( req.body._id),
      status: req.body.status,
      nota: req.body.nota,
      entregaUri: req.body.entregaUri,
      dataEntrega: new Date( req.body.dataEntrega)
    }
    console.log( content);

    let doc = await Course.updateOne(
      { 
        '_id' : courseId
      }, 
      {
        'Alunos' : [
          {
            'userId' : userId,
            'atividades' : [
              content
            ]
          }
        ]
      }
    );

    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};