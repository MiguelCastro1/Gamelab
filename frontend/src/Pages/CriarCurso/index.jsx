import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch} from "react-icons/bi";
import * as React from 'react';
import { BsChevronCompactLeft, BsKanban, BsFilter, BsCalendarCheck} from "react-icons/bs";
import {FiHome} from "react-icons/fi"
import {FaDoorOpen} from "react-icons/fa"
import HeaderHome from "../../components/HeaderHome";
import BoxTurmaEnroll from "../../components/BoxTurmaEnroll";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import { getToken } from "../../services/auth";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const formSchema = Yup.object().shape({
  nomeCurso: Yup.string().required("Campo obrigatório"),
  descricao: Yup.string().required("Campo obrigatório"),
 // codigo: Yup.string().max(10, "Limite atingido").required("Campo obrigatório"),
  confirmacao_senha: Yup.string()
    .oneOf([Yup.ref("senha"), null], "As senhas não são iguais"),
});

function CriarCurso() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [habilitado, setHabilitado] = useState(-1);
  const [date, setDate] = useState(new Date());
  const [searchString, setSearchString] = useState("");
  let navigate = useNavigate();

  let { id, email } = getToken() ? JSON.parse(getToken()) : null;
  const handleSubmit = async (values, actions) => {
      let object = {
        ...values,
        autorEmail: email,
        autorId: id
      };
      console.log(object);
    
      try {
        
        await api.post("/cursos", object);
        console.log('done')
        toast("Curso criado com Sucesso")
        navigate("/");
      } catch (error) {
        toast.error("Algum erro ocorreu")
        console.log(error);
      }
    };
  
  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sideBarLeft}>
            <ul>
              <li></li>
              <li>
                <Link to="/kanban">
                  {" "}
                  Meu Kanban <BsKanban size={20} />{" "}
                </Link>
              </li>
              <li>
                <Link to="/">
                  {" "}
                  Home
                  <FiHome size={20} />{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.feed}>
            <header>
              <h1 className="C">Criar Turma</h1>
            </header>
                <Formik initialValues={{
                nomeCurso: "",
                materia: "",
                descricao: "",
                senha: "",
                confirmacao_senha: "",
                codigo: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={formSchema}
              >
              {({handleSubmit, ...props})=> (
              <Form>
                <Input 
                name="nomeCurso"
                label={"Nome do curso"}
                type="text"
                />
                <Input
                name="materia"
                label={"Materia"}
                type="text"
                />    
                <Input
                name="descricao"
                label={"Descrição"}
                type="text"
                />  
                <Input
                name="codigo"
                label={"Codigo da turma"}
                type="text"
                />  
              <p className={styles.senha_h}>Habilitar senha <input id="toggle" className={styles.toggle} type="checkbox" onClick={() => setHabilitado(habilitado * -1)}></input>
              <label htmlFor="toggle"></label></p> 
              {habilitado === 1 &&(
                <div className={styles.campo_senha}> 
                <Input name="senha" label={"Inserir senha"} type="password" placeholder=""/>
                <Input name="confirmacao_senha" label={"Confirmar senha"} type="password" placeholder=""/>
                </div>
              )}
              <Button variant="outlined" onClick={handleClickOpen}>
               Criar curso
              </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                  <DialogTitle id="alert-dialog-title">
                    {"Você deseja realmente adicionar um curso?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose}  >Cancelar</Button>
                    <Button onClick={handleSubmit}>Confirmar</Button>
                  </DialogActions>
              </Dialog>
              </Form>
              )}
              </Formik>
            <div>

    
            </div>
            {}
          </div>


          <div className={styles.sideBarRight}>
            <ul>
               
              <li className={styles.avisos}>
                <h3>Calendário</h3>
                <Calendar
                  className={styles.reactCalendar}
                  onChange={setDate}
                  value={date}
                />
              </li>
                
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default CriarCurso;
