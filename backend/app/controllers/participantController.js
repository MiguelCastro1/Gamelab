const mongoose = require("mongoose");
const { parseJwt } = require("../middlewares/decodedToken");
const Participant = mongoose.model("Participant");

exports.createCourseParticipant = async (req, res) => {
  try {
      
    let token = req.headers.authorization.split(" ")[1];
    let object = parseJwt(token);
    let userId = object.id;
    let courseId = req.params.id;   
    let participant = {
      userId: new mongoose.Types.ObjectId( userId),
      courseId: new mongoose.Types.ObjectId( courseId)
    }
    let document = await Participant.create( participant);
    res.status(200).json({
      document,
      message: `Participante cadastrado com sucesso`,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

//listar participantes de curso, pelo id de curso
exports.listCourseParticipants = async (req, res) => {
  try {
    let busca = { courseId: new mongoose.Types.ObjectId( req.params.id)};
    const doc = await Participant.find( busca);
    let encontrados = Object.keys(doc).length;
    res.status(200).json({
      message: `Foram encontrados ${encontrados} resultado(s).`,
      doc,
    });
  } catch (err) {
    res.status(500).json({
      message: "Algo deu errado!",
    });
  }
};
