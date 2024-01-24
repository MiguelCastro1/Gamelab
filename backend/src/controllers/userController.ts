import { Request, Response } from "express";
import { encrypt, compare } from "../helpers/bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import nodemailer from "nodemailer";
import User, { IUser } from "../models/user"

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Dados incompletos");
  }

  try {
    let user = await User.findOne({ email });
    
    if (user) {
      let pass = compare(password, user.senha);

      if (pass) {
        let payload = {
          id: user._id,
          perfil: user.perfil,
          nome: user.nome,
          email: user.email,
        };

        res.status(200).json({
          user: payload,
          token: jwt.sign(payload, process.env.SECRET_KEY ?? "SECRET", { expiresIn: "1d" }),
        });
      } else {
        res.status(401).send("email e/ou senha inválidos");
      }
    } else {
      res.status(401).send("email e/ou senha inválidos");
    }
  } catch (error) {
    res.status(500).send("Erro no Servidor");
  }
};

const create = async (req: Request, res: Response) => {
  let user_dados: IUser = {
    ...req.body,
    senha: encrypt(req.body.senha),
    imageAvatar: "user_padrao.png",
  };

  try {
    let user = await User.create(user_dados);
    res.status(201).json({
      user,
      message: `${req.body.perfil} cadastrado com sucesso`,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const update = async (req: Request, res: Response) => {
  let userId = req.params.id
  let user_dados: IUser = req.body;
  
  try {
    let user = await User.findOneAndUpdate({ _id: userId }, user_dados);
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuários" });
  }
};

const get_one = async (req: Request, res: Response) => {
  try {
    let userId = req.params.id
    let user = await User.findById(userId);

    if(user){
      res.status(200).json({ user });
    }else{
      res.status(401).send("Usuario não encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

const get_all = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    if(users){
      res.status(200).json({ users });
    }else{
      res.status(200).send("Nenhum usuario Encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
};

const upload_avatar = async (req: Request, res: Response) => {
  let userId = req.params.id;

  try {
    if (req.file) {
      let user = await User.findOne({ _id: userId });

      if(user){
        // Verificar Funcionamento
        if (user.pathImageAvatar) {
          fs.unlink(user.pathImageAvatar, (err) => {
            if (err) {
                res.status(500).json({ message: "Erro ao alterar a imagem" });
              return;
            }
          });
        }
        let new_user = await User.findOneAndUpdate(
          { _id: userId },
          {
            imageAvatar: req.file.filename,
            pathImageAvatar: req.file.path,
          }
        );
      } else {
        let new_user = await User.findOneAndUpdate(
          { _id: userId },
          {
            imageAvatar: "user_padrao.png",
          }
        );
      }
      res.status(200).send("imagem alterada com sucesso");
    }else{
      res.status(400).send("Usuario não encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao alterar a imagem" });
  }
};

const get_image_avatar = async (req: Request, res: Response) => {
  try {
    let userId = req.params.id;
    let user = await User.findOne({ _id: userId });
    
    if(user){
      res.status(200).json({ image: user.imageAvatar });
    }else{
      res.status(400).send("Usuario não encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar  imagem" });
  }
};

const send_mail = async (req: Request, res: Response) => {
  try {
    let email = req.body.email ?? ''
    let user = await User.findOne({ email });
    if (user) {
      let payload = {
        id: user._id,
        nome: user.nome,
        email: user.email,
      };

      let token = jwt.sign(payload, process.env.SECRET_KEY ?? "SECRET");

      await User.findOneAndUpdate(
        { email },
        { tokenRecuperarSenha: token }
      );

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
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
                      }

                      .image img {
                        width: 300px;
                        pointer-events:none;
                      }                
              
                      h2 {
                        font-size: 3rem;
                        font-weight: 700;
                        color: #363795
                      }
              
                      .container p {
                          padding-bottom: 10px;
                      }
                      .paragrafo 
                          padding-bottom: 15px;
                      }
                      
                  </style>
              </head>
              <body>
                  <div class="container">
                    <p class="image">
                      <img src="https://i.ibb.co/0ZCCPVL/Reset-password-cuate.png" alt="Reset-password-cuate" border="0" />
                    </p>  
                    <p>Caro(a) ${user.nome}</p>
                    <p class="paragrafo">
                      Este é um email para a recuperação de senha.<br></br>
                    </p>
                      Acesse o link: <a href="${process.env.FRONT_BASE_URL}/resetarsenha?_token=${token}">Recuperar senha</a>
                    <p>
                      <br></br>
                      Messagem automática, favor não responder este e-mail
                      <br></br>
                    </p>
                    <h2>GameLab</h2>
                  </div>
              </body>
              </html>`
      }
  
      transporter
        .sendMail(mailOptions)
        .then((info) => res.send(info))
        .catch((err) => res.send(err));

    } else {
      res.status(500).json({ message: "Email não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Email não encontrado" });
  }
};

const reset_password = async (req: Request, res: Response) => {
  let { novasenha, token } = req.body;

  try {
    let user = await User.findOne({ tokenRecuperarSenha: token });
    
    if (user) {
      await User.findOneAndUpdate(
        { tokenRecuperarSenha: token },
        { senha: encrypt(novasenha) }
      );
      await User.findOneAndUpdate(
        { tokenRecuperarSenha: token },
        { tokenRecuperarSenha: "" }
      );

      res.status(200).json({ message: "Senha alterada com sucesso" });
    } else {
      res.status(401).json({ message: "Link expirado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Link expirado" });
  }
};

export default {  create, 
                  login, 
                  update, 
                  get_one, 
                  get_all, 
                  upload_avatar, 
                  get_image_avatar, 
                  send_mail, 
                  reset_password 
              };

