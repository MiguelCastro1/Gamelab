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

const formSchema = Yup.object().shape({
  titulo: Yup.string().required("Campo obrigatório"),
  descricao: Yup.string().required("Campo obrigatório"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
};

function kanban() {
  const board = {
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
  const [quadro, setQuadro] = useState(board);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    console.log(quadro);
  };

  const handleSubmit = async (values) => {
    let newTask = {
      id: Math.floor(Math.random() * 1000),
      ...values,
    };
    let newBoard = { ...board };
    newBoard.columns[0].cards = [...newBoard.columns[0].cards, newTask];
    console.log(newBoard);
    setQuadro(newBoard);
    handleClose();
  };

  return (
    <div className={styles.feed}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{
              titulo: "",
              descricao: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {function showForm({ values, handleChange }) {
              return (
                <Form className={styles.formContainer}>
                  <div className={styles.modalContent}>
                    <header>
                      <h3>Criar task</h3>
                    </header>
                    <main>
                      <Input
                        label="Título"
                        name="titulo"
                        value={values.titulo}
                        onChange={handleChange}
                        type="text"
                        autoFocus={true}
                      />
                      <TextArea
                        label="Descrição"
                        name="descricao"
                        value={values.descricao}
                        onChange={handleChange}
                        type="text"
                      />
                    </main>
                    <footer>
                      <button
                        onClick={handleClose}
                        type="button"
                        className={styles.cancelar}
                      >
                        Cancelar
                      </button>
                      <button className={styles.salvar} type="submit">
                        Salvar
                      </button>
                    </footer>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Modal>
      <h1>Kanban</h1>
      <button className={styles.button} onClick={handleOpen}>
        Adicionar atividade <GrFormAdd />
      </button>
      <Board initialBoard={quadro} />
    </div>
  );
}

export default kanban;
