import { Link, useNavigate } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import {FcUpload, FcSportsMode} from "react-icons/fc";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import DialogContentText from '@mui/material/DialogContentText';
import comemoracao from "../../assets/comemora.gif";
import {Button} from "@mui/material";
import cool from "../../assets/cool.gif"
import awesome from "../../assets/awesome.gif"
import samurai from "../../assets/samurai.gif"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../../services/axios";

function AvaliarAtividadeCurso({atividade,monstro, alunos, courseId, ...props}) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const data = atividade.dataEntrega ? Date.parse(atividade.dataEntrega) : '';
  const status = [samurai,cool,awesome]
  const data_ati = new Date(data);
  const data_curr = new Date();

  const diffTime = data_ati >= data_curr ? Math.abs(data_ati - data_curr) : -1 * Math.abs(data_curr - data_ati) ;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  const diffDays_real = diffTime / (1000 * 60 * 60 * 24);
  const {id, perfil} = localStorage.getItem("gamelab") ? JSON.parse(localStorage.getItem("gamelab")): null;

  console.log(diffDays_real)

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   // navigate(`curso/${courseId}`);
  };


  return (
      <div className={styles.feed}>
        <div className={styles.titulo}>
       <h1>{atividade.titulo}</h1>
       </div>
       <div className={styles.descricao}>
         <h2>Descrição: </h2>
         <p>{atividade.descricao}</p>
        </div>
        <div className={styles.dados}>           
        <div>
            <h2>Data de Entrega: </h2>
            <p>{data_ati.toLocaleDateString()}</p>
          </div>
          <div>
            <h2>Hora de Entrega: </h2>
            <p>{data_ati.toLocaleTimeString()}</p>
          </div>
          <div>
            <h2>Tempo Restante: </h2>
            <p>{diffDays} Dias</p>
          </div>
        </div>

        <div className={styles.alunos}>
         
        </div>
      </div>      
  );
}

export default AvaliarAtividadeCurso;
