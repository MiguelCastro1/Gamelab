const mongoose = require("mongoose");
const { parseJwt } = require("../middlewares/decodedToken");
const Notice = mongoose.model("Notice");
const Course = mongoose.model("Course");



exports.createNotice = async (req, res) => {
    console.log("entrou")
    try {
        let document = await Notice.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            courseId: mongoose.Types.ObjectId( req.body.courseId)
        });
        res.status(200).json({
            document,
            message: `Aviso ${req.body.titulo} criado com sucesso.`
        });
    } catch (error) {
        console.error( error);
        res.status(500).json({ 
            message: "Algo deu errado, tente mais tarde."
        });
    }
};

exports.listNoticesFromUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let courses = await Course.find({ 
            "Alunos.userId": userId},
            { _id: 1}
        );
        let query = {
            courses
        }
        //console.log(query);
        let document = await Notice.find( query).sort('-createdAt');
        res.status(200).json({
            document
        });
    } catch (error) {
        console.error( error);
        res.status(500).json({ 
            message: "Algo deu errado, tente mais tarde."
        });
    }
};

