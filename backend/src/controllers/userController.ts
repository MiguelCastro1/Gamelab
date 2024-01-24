import {model} from "mongoose";
import { Request, Response } from "express";
import { parseJwt } from "../middlewares/decodedToken";
import { encrypt, compare } from "../helpers/bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import User, { IUser, IUserObj } from "../models/user"
import Board, { IBoard } from "../models/board"

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

interface IQuery {
  id: string
}

const update = async (req: Request<IQuery, {}, IUser>, res: Response) => {
  let userId = req.params.id
  let user_dados = req.body;
  
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

// Método para alterar o schema geral de usuários
const scriptUpdate = async (req, res) => {
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

const sendmail = async (req, res) => {

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

const resetSenha = async (req, res) => {

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

const createBoard = async (userId) =>{
  
  try {
    let entrada = {
      userId : userId,
      columns : [
        {
          id: 1,
          title: "To Do",
          cards: [
            
          ],
        },
        {
          id: 2,
          title: "Doing",
          cards: [
            
          ],
        },
        {
          id: 3,
          title: "Done",
          cards: [
            
          ]
        }
      ],
      counter : 0
    };
    let document = await Board.create(entrada);
    console.log( document);
    return document;
  } catch (e) {
    return e.message;
  }
};

//modifica um board para usuario
const updateBoard = async (req, res) => {
  let userId = req.params.id;
  try {
    let doc = await Board.findOneAndUpdate({ userId: userId }, req.body);
    res.status(200).json({ doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Algo de errado ocorreu ao tentar atualizar seu quadro!" });
  }
};

//pega um board para usuario
const getBoard = async (req, res) => {
  try {
    let doc = await Board.findOne( 
      {
        userId: req.params.id
      }
    );

    console.log( doc);
    res.status(200).json( {doc});
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: "Quadro não encontrado!" });
  }
};

export default { create, login, update, get_one,createBoard, updateBoard,   get_all, upload_avatar, get_image_avatar, scriptUpdate, sendmail, resetSenha, getBoard }

