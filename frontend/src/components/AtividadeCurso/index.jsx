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

function AtividadeCurso({atividade, monstro, alunos, courseId, atividadeId, ...props}) {
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
  let atividade_aluno = []
    if(perfil === 'aluno')
     atividade_aluno = alunos.filter(aluno => aluno.userId._id === id)[0].atividades.filter(atividade => atividade.atividadeId === atividadeId)[0];


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
        {perfil === 'aluno' &&
        <img
            src={monstro}  
            alt="Monstro"  
            width={115}
            height={115}
          />
        }
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
        {perfil === 'aluno' && (
          <div className={styles.dados}>           
            <div>
              <h2>Status: </h2>
              <p>{atividade_aluno.status ? atividade_aluno.status :  ''}
              </p>
            </div>
            <div>
              <h2>Nota: </h2>
              <p>{atividade_aluno.status && 
                  atividade_aluno.status === 'aberto' ?
                  'Ainda não foi entregue' : aluno_atividade.status === 'entregue' ?
                  'Ainda não foi avaliado' : aluno_atividade.nota 
              }
              </p>
            </div>
            
            <div className={styles.anexo} style={{backgroundColor: '#ADD8E6'}}>
              <h2> Arquivo: </h2>
              <Button variant="outlined" startIcon={<FcUpload />}>
              Anexar Arquivo
              </Button>
            </div>
          </div>
        )}

      {perfil === 'aluno' && (
        <div className={styles.enviar}>
          <img
              src={status[0]}  
              alt="Monstro"  
              width={120}
              height={110}
            />
            <Button  variant="outlined" onClick={handleClickOpen}>
              Enviar Atividade
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" className="Dialog">
                <DialogTitle id="alert-dialog-title" fontSize={16} textAlign={'center'} >
                <p >Você entregou a atividade!</p>
                </DialogTitle>
                <DialogContentText variant="outlined" id="alert-dialog-description"  textAlign={'center'} >
                  <img className="imagem"
                    src={comemoracao}  
                    alt="comemoração"  
                    width={115}
                    height={115}
                    >
                    </img>
                </DialogContentText>
    
                <DialogActions>
                  <Button onClick={handleClose}>Voltar</Button>
                </DialogActions>
              </Dialog>
        </div>
        )}
  
        {perfil === 'professor' && (

          <div> 
          </div>
        )}
      </div>      
  );
}

export default AtividadeCurso;
