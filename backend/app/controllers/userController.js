const mongoose = require("mongoose");
const { parseJwt } = require("../middlewares/decodedToken");
const User = mongoose.model("User");
const { encrypt, compare } = require("../helpers/bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

exports.createUser = async (req, res) => {
  let entrada = {
    ...req.body,
    senha: encrypt(req.body.senha),
    imageAvatar: "user_padrao.png",
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
    let doc = await User.findOneAndUpdate({ _id: userId }, req.body);
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar usuários" });
  }
};

exports.user = async (req, res) => {
  try {
    let userId = req.params.id;
    let token = req.headers.authorization.split(" ")[1];
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
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

exports.uploadAvatar = async (req, res) => {
  let userId = req.params.id;
  console.log(path.resolve(req.file));

  try {
    if (req.file) {
      await User.findOneAndUpdate(
        { _id: userId },
        { imageAvatar: req.file.filename }
      );
    } else {
      await User.findOneAndUpdate(
        { _id: userId },
        { imageAvatar: "user_padrao.png" }
      );
    }
    res.send("imagem alterada com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao alterar a imagem" });
  }
};

exports.getImageAvatar = async (req, res) => {
  try {
    let userId = req.params.id;
    const { imageAvatar } = await User.findOne({ _id: userId });
    console.log(path.resolve(imageAvatar));
    res.json({ image: imageAvatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar  imagem" });
  }
};

// Método para alterar o schema geral de usuários

exports.scriptUpdate = async (req, res) => {
  try {
    let usuarios = await User.find({}, { _id: 1, nome: 1 });
    for await (let user of usuarios) {
      await User.findOneAndUpdate(
        { _id: user._id },
        { imageAvatar: "user_padrao.png" }
      );
    }
    res.send("atualização concluída");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao executar script" });
  }
};

exports.sendmail = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let payload = {
        id: user._id,
        nome: user.nome,
        email: user.email,
      };

      let token = jwt.sign(payload, process.env.SECRET_KEY);

      await User.findOneAndUpdate(
        { email: req.body.email },
        { tokenRecuperarSenha: token }
      );

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      transporter
        .sendMail({
          from: process.env.EMAIL_USER,
          to: req.body.email,
          subject: "Recuperação de senha - GameLab",
          html: `<html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                p {
                    color: #000;
                }
        
                header {
                    padding: 2rem 4rem;
                    background: #00a7af
                }
        
                .image {
                   text-align: center;
                }
        
                header img {
                    width: 160px;
                }
    
                h1 {
                  font-size: 4rem;
                  font-weight: 700;
                  color: #363795
                }
        
                h2 {
                    padding: 10px 0 0 0;
                    color: #fff;
                    font-family: sans-serif;
                    text-align: center;
                }       
                
                .container p {
                    padding-bottom: 10px;
                }
                .paragrafo {
                    padding-bottom: 15px;
                }
                
            </style>
        
        
        </head>
        <body>
            <div class="container">
                <h1>GameLab</h1>
                <p>Caro(a) ${user.nome}</p>
                <p class="paragrafo">
                    Este é um email para a recuperação de senha.<br></br>
                </p>
                Acesse o link: <a href="http://localhost:3000/resetarsenha?_token=${token}">Recuperar senha</a>
                <p>
                    <br></br>
                    Messagem automática, favor não responder este e-mail
                </p>
                
            </div>
        </body>
        </html>`,
        })
        .then((info) => res.send(info))
        .catch((err) => res.send(err));
    } else {
      res.status(500).json({ message: "Email não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Email não encontrado" });
  }
};

exports.resetSenha = async (req, res) => {
  let { novasenha, token } = req.body;
  console.log(req.body);

  try {
    let user = await User.findOne({ tokenRecuperarSenha: token });
    console.log(user);
    if (user) {
      await User.findOneAndUpdate(
        { tokenRecuperarSenha: token },
        { senha: encrypt(novasenha) }
      );
      await User.findOneAndUpdate(
        { tokenRecuperarSenha: token },
        { tokenRecuperarSenha: "" }
      );

      res.json({ message: "Senha alterada com sucesso" });
    } else {
      res.status(401).json({ message: "Link expirado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Link expirado" });
  }
};
