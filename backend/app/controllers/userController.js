const mongoose = require("mongoose");
const { parseJwt } = require("../middlewares/decodedToken");
const User = mongoose.model("User");
const { encrypt, compare } = require("../helpers/bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  let entrada = {
    ...req.body,
    senha: encrypt(req.body.senha),
  };
  console.log(entrada);
  try {
    let document = await User.create(entrada);
    res.status(200).json({
      document,
      message: `${req.body.tipoUsuario} cadastrado com sucesso`,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(500).send("Dados incompletos");
  }

  try {
    let usuario = await User.findOne({ email });
    if (usuario) {
      let pass = compare(senha, usuario.senha);
      if (pass) {
        let payload = {
          id: usuario._id,
          perfil: usuario.tipoUsuario,
          nome: usuario.nome,
          email: usuario.email,
        };
        res.status(200).json({
          user: payload,
          token: jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" }),
        });
      } else {
        res.status(401).send("email e/ou senha inválidos");
      }
    } else {
      res.status(401).send("email e/ou senha inválidos");
    }
  } catch (error) {
    res.status(500).send("email e/ou senha inválidos");
  }
};

exports.update = async (req, res) => {
  let userId = req.params.id;
  try {
    let doc = await User.findOneAndUpdate({ id: userId }, req.body);
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};

exports.user = async (req, res) => {
  try {
    
   // let userId = req.params.id;
    let token = req.headers.authorization.split(" ")[1];
    let userId = parseJwt(token).id;
    let doc = await User.findById(userId);
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};

exports.listAll = async (req, res) => {
  try {
    const doc = await User.find({});
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};
