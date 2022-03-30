const mongoose = require("mongoose");
const { parseJwt } = require("../middlewares/decodedToken");
const Notice = mongoose.model("Notice");


exports.createNotice = async (req, res) => {
    try {
        console.log(req.body);
        let document = await Notice.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            userId: mongoose.Types.ObjectId( req.body.userId)
        });
        console.log('done');
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
        
    } catch (error) {
        
    }
};