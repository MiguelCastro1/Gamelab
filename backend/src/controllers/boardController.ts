import { Request, Response } from "express";
import Board, { IBoard } from "../models/board"

const createBoard = async (userId:string) =>{
    try {
      let entrada = {
        userId : userId,
        columns : [
          {
            id: 1,
            title: "To Do",
            cards: [],
          },
          {
            id: 2,
            title: "Doing",
            cards: [],
          },
          {
            id: 3,
            title: "Done",
            cards: []
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