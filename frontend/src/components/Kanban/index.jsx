import { useState } from "react";
import styles from "./styles.module.scss";
import Board from "@asseinfo/react-kanban";
import { GrFormAdd } from "react-icons/gr";
import Modal from "@mui/material/Modal";
import { Formik, Form } from "formik";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Input from "../../components/Input";
import * as Yup from "yup";
import "@asseinfo/react-kanban/dist/styles.css";
import TextArea from "../TextArea";

function kanban() {
  const initialBoard = {
    counter: 9,
    columns: [
      {
        id: 1,
        title: "To Do",
        cards: [
          {
            id: 1,
            title: "Fazer testes",
            description: "Fazer testes de usabilidade no site Gamelab",
          },
          {
            id: 4,
            title: "Fazer testes",
            description: "Fazer testes de usabilidade no site Gamelab",
          },
          {
            id: 7,
            title: "Fazer testes",
            description: "Fazer testes de usabilidade no site Gamelab",
          },
        ],
      },
      {
        id: 2,
        title: "Doing",
        cards: [
          {
            id: 2,
            title: "Apresentação da sprint2",
            description: "Explicar para a professora oque foi feito na sprint2",
          },
        ],
      },
      {
        id: 3,
        title: "Done",
        cards: [
          {
            id: 3,
            title: "Integrar criar aviso",
            description: "Integrar criar aviso com email",
          },
        ],
      },
    ],
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [board, setBoard] = useState(initialBoard);

  function onCardNew(newCard) {

    const newCardLocal = { id: initialBoard.counter + 1, ...newCard };
    initialBoard.counter = initialBoard.counter + 1;
    console.log(initialBoard)
    setBoard(initialBoard);
    return newCardLocal;
  }

  return (
    <div className={styles.feed}>
      
      <h1>Kanban</h1>
      <Board initialBoard={board}
            allowRemoveLane
            allowRenameColumn
            allowRemoveCard
            onLaneRemove={console.log}
            onCardRemove={console.log}
            onLaneRename={console.log}
            allowAddCard={{ on: "top" }}
            onNewCardConfirm={onCardNew}
            onCardNew={console.log}/>
    </div>
  );
}

export default kanban;
