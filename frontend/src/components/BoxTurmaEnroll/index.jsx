import * as React from 'react';

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaDoorOpen, FaGraduationCap} from "react-icons/fa";
import styles from "./styles.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState,  } from "react";
import user_padrao from "../../assets/user_padrao.png"
import api from "../../services/axios";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function BoxTurmaEnroll({ course_id, nomeTurma, professor, descricao, senha_curso, ...props }) {
  const [senha,setSenha] = useState("")
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate()
  const enroll =  () =>{
    if(senha_curso === undefined && senha_curso !== ''){
      try {
        api.post(`/cursos/${course_id}/matricula`)
        .then((data) => {
          toast("Matriculado com sucesso!");
          console.log('done');
          navigate('/');
        })
        .catch((err) =>  {
          toast.error("Algum Erro ocorreu") 
          console.log(err)
        })
      }catch (error) {
        toast.error("Algum Erro ocorreu") 
          console.log(err)
      }
    }else{
      if(senha === senha_curso){
        try {
          api.post(`/cursos/${course_id}/matricula`)
          .then((data) => {
            toast("Matriculado com sucesso!");
            console.log('done')
            navigate('/')
          })
          .catch((erro) => {
            toast.error("Algum Erro ocorreu") 
            console.log(err)})
        }catch(err)  {
          toast.error("Algum Erro ocorreu") 
          console.log(err)
        }
      }else{
        toast.error("Senha inválida") 
        console.log("senha inválida")
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>
          <h3>{nomeTurma}</h3>
          <FaGraduationCap/>
        </section>
        <section>
          <p>
            <span>Professor: </span>{professor}
            <img src= {user_padrao} alt="Professor" />
          </p>
          <p>
            <span>Descrição:</span> {descricao}
            <Button className={styles.matricula} onClick={handleClickOpen}>
              Matricular-se <FaDoorOpen size={20}/>
              </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                  <DialogTitle id="alert-dialog-title">
                    {"Você deseja realmente se matricular?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose}  >Cancelar</Button>
                    <Button onClick={enroll}>Confirmar</Button>
                  </DialogActions>
              </Dialog>
            {senha_curso !== undefined &&  senha_curso !== '' &&
              <input
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
                placeholder="Insira Chave"
              />
            }
          </p>
        </section>
      </div>
    </div>
  );
}

export default BoxTurmaEnroll;
