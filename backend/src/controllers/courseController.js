const mongoose = require("mongoose");
const { parseJwt } = require("../middlewares/decodedToken");
const fs = require("fs");
const Course = mongoose.model("Course");

exports.createCourse = async (req, res) => {
  try {
    console.log(req.body);
    let document = await Course.create(req.body);
    console.log("done");
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
    let fields1 = "nome _id";
    let fields2 = "nome _id email imageAvatar";
    let doc = await Course.findById(courseId)
      .populate("autorId", fields1)
      .populate("Alunos.userId", fields2);
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};

exports.getCourseUpdate = async (req, res) => {
  try {
    let courseId = req.params.courseId;
    let doc = await Course.findById(courseId);
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
};

exports.update = async (req, res, next) => {
  //console.log(req.body)
  let courseId = req.params.courseId;
  try {
    let doc = await Course.findOneAndUpdate({ _id: courseId }, req.body);
   // res.status(200).json({ doc });
    next();
  } catch (error) {
    console.error(error);
  }
};

exports.updateCascade = async (req, res) => {
  const courseId = req.params.courseId;
  console.log('update_cascade')
  try {
    let doc = await Course.findById(courseId);

    const atividades = [].concat.apply(
      [],
      doc.secoes
        .map((secao) =>
          secao.conteudos.filter((conteudo) => conteudo.tipo === "Atividade")
        )
        .filter((atividade) => atividade.length > 0)
    );
    // console.log({atividades})

    if (atividades.length > 0 && doc.Alunos.length > 0) {
      //Adicionar atividades aos alunos
      if (atividades.length > doc.Alunos[0].atividades.length) {
        //console.log({Alunos})
        let index = 0;
        for (index = 0; index < doc.Alunos[0].atividades.length; index++) {
          if (
            doc.Alunos[0].atividades[index].atividadeId !==
            String(atividades[index]._id)
          ) {
            break;
          }
        }

        for (let i = 0; i < doc.Alunos.length; i++) {
          const atividade = {
            status: "aberto",
            nota: 0,
            atividadeId: atividades[index]._id,
          };
          //console.log({...doc.Alunos[i], atividades: [...doc.Alunos[i].atividades, atividade]})
          doc.Alunos[i].atividades = [...doc.Alunos[i].atividades, atividade];
        }

        doc = await Course.findOneAndUpdate({ _id: courseId }, doc);
        console.log("done");
        //exluir atividades dos alunos
      } else if(atividades.length < doc.Alunos[0].atividades.length){
        let index = 0;
        for (index = 0; index < doc.Alunos[0].atividades.length; index++) {
          if (
            doc.Alunos[0].atividades[index].atividadeId !==
            String(atividades[index]._id)
          ) {
            break;
          }
        }

        for (let i = 0; i < doc.Alunos.length; i++) {
          doc.Alunos[i].atividades = doc.Alunos[i].atividades.slice(0, index);
        }

        doc = await Course.findOneAndUpdate({ _id: courseId }, doc);
        console.log("done");
      }else {
        console.log("sem nova atividades");
      }
    } else {
      console.log("sem alunos ou atividades");
    }
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};

//listar cursos para professor, dentre os quais é autor - permite pesquisa por: nome do curso e descrição.
exports.listCoursesFromTeacher = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let autor = parseJwt(token).email;
  let fields1 = "nome _id";
  try {
    let busca = req.query.pesquisa || "";
    let fields = {
      _id: 0,
    };
    const doc = await Course.find({
      $or: [
        { nomeCurso: { $regex: "(?i).*" + busca + ".*(?i)" } },
        { descricao: { $regex: "(?i).*" + busca + ".*(?i)"  } },
      ],
      // para o professor enxergar apenas os cursos criados por ele
      autorEmail: autor,
    }).populate("autorId", fields1);
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
    let fields1 = "nome _id";
    let token = req.headers.authorization.split(" ")[1];
    let studentId = mongoose.Types.ObjectId(parseJwt(token).id);
    let busca = req.query.pesquisa || "";
    let fields = {
      _id: 0,
    };
    const doc = await Course.find({
      $or: [
        { nomeCurso: { $regex: "(?i).*" + busca + ".*(?i)" } },
        { descricao: { $regex: "(?i).*" + busca + ".*(?i)" } },
      ],
      "Alunos.userId": studentId,
    }).populate("autorId", fields1);
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
    let message = "";

    let doc = await Course.findById(courseId);
    const atividades = [].concat.apply(
      [],
      doc.secoes
        .map((secao) =>
          secao.conteudos.filter((conteudo) => conteudo.tipo === "Atividade")
        )
        .filter((atividade) => atividade.length > 0)
    );

    let aluno = {
      userId: new mongoose.Types.ObjectId(userId),
      atividades: atividades.map((atividade) => ({
        status: "aberto",
        nota: 0,
        atividadeId: atividade._id,
      })),
    };
    let document = await Course.updateOne(
      { _id: courseId, "Alunos.userId" : { "$ne" : userId} },
      { $push: { Alunos: aluno } }
    );
    
    if (document.matchedCount != 0){
      message = "Aluno matriculado com sucesso";
    }else{
      message = "Aluno já matriculado";
    }

    res.status(200).json({
      document,
      message: message,
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
      userId: new mongoose.Types.ObjectId(userId)
    };

    let document = await Course.updateOne(
      { _id: courseId },
      { $pull: { Alunos: aluno } }
    );
    
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
  console.log('enroll')
  try {
    let token = req.headers.authorization.split(" ")[1];
    let studentId = parseJwt(token).id;
    let fields = "nome _id email imageAvatar";
    const doc = await Course.find({}).populate("autorId", fields);

    //carregar cursos que aluno nao esteja matriculado
    let results = [];
    for (let i = 0; i < doc.length; i++) {
      let matriculado = false;
      if (doc[i].Alunos) {
        for (let j = 0; j < doc[i].Alunos.length; j++) {
          if (doc[i].Alunos[j].userId == studentId) {
            matriculado = true;
          }
        }
      }
      if (!matriculado) results.push(doc[i]);
    }

    //const results = doc.filter((turma) => turma.Alunos.filter((alunos) => studentId !== alunos.userId))
    res.status(200).send({ results });
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

//pegar entregas para aluno
exports.getCourseDeliveries = async (req, res) => {
  try {
    let courseId = req.params.courseId;
    let userId = req.params.userId;
    let fields1 = "Alunos";
    let doc = await Course.findOne(
      {
        _id: courseId,
        Alunos: { $elemMatch: { userId: userId } },
      },
      fields1
    );
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};

//pegar entregas de atividade
exports.getDeliveries = async (req, res) => {
  try {
    let courseId = req.params.courseId;
    let id = req.params.id;

    let match = { 
      '_id' : courseId,
      'Alunos.atividades.atividadeId' : id
    };
    let fieldProject = 'Alunos.atividades -_id Alunos.userId';
    let userFields = 'nome email';

    let doc = await Course.findOne(
      match,
      fieldProject
    ).populate(
      "Alunos.userId", userFields
    );
    doc.Alunos = doc.Alunos.filter( function(aluno){
        aluno.atividades = aluno.atividades.filter( function( atividade){
            return atividade.atividadeId == id;
          }
        );
        return aluno.atividades.length > 0;
      }
    );
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};


//atualiza todo content para atividade( content._id) para um aluno( userId) de uma turma( courseId)
exports.updateDeliverie = async (req, res) => {
  try {
    console.log(req.file);
    let courseId = new mongoose.Types.ObjectId(req.params.courseId);
    let userId = new mongoose.Types.ObjectId(req.params.userId);

    let content = {
      atividadeId: new mongoose.Types.ObjectId(req.body._id),
      entregaUri: req.file.filename,
      status: "entregue",
      nota: 0,
      dataEntrega: req.body.dataEntrega
    };
    console.log(content);

    await Course.updateOne(
      {
        _id: courseId,
      },
      {
        $pull: {
          "Alunos.$[aluno].atividades": {
            atividadeId: content.atividadeId,
          },
        },
      },
      {
        multi: false,
        upsert: false,
        arrayFilters: [
          {
            "aluno.userId": {
              $eq: userId,
            },
          },
        ],
      }
    );

    let doc = await Course.updateOne(
      {
        _id: courseId,
      },
      {
        $push: {
          "Alunos.$[aluno].atividades": content,
        },
      },
      {
        multi: true,
        upsert: true,
        arrayFilters: [
          {
            "aluno.userId": {
              $eq: userId,
            },
          },
        ],
      }
    );

    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao enviar atividade" });
  }
};

exports.downloadFile = async (req, res) => {
  let { urifile } = req.params;

  //res.setHeader("Access-Control-Allow-Origin", "*");

  var file = __dirname + `/../../public/atividades/${urifile}`;
  try {
    res.download(file);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};
