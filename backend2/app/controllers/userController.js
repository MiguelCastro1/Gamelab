const mongoose = require("mongoose");
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
    console.log('enviando')
    let document = await User.create(entrada);
    console.log('enviado')
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
          nome: usuario.nome,
          email: usuario.email,
        };
        res.status(200).send({
          email: usuario.email,
          token: jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" }),
        });
      }
    } else {
      res.status(401).send("email e/ou senha inválidos");
    }
  } catch (error) {
    res.status(500).send("email e/ou senha inválidos");
  }
};

exports.list = async (req, res) => {
  try {
    const doc = await User.find({});
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
  }
};