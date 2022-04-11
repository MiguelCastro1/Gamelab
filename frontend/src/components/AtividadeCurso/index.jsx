import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import {FcUpload, FcSportsMode} from "react-icons/fc";
import styles from "./styles.module.scss";
import { useState } from "react";
import DialogContentText from '@mui/material/DialogContentText';
import comemoracao from "../../assets/comemora.gif";
import {Button} from "@mui/material";
import cool from "../../assets/cool.gif"
import awesome from "../../assets/awesome.gif"
import samurai from "../../assets/samurai.gif"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function AtividadeCurso({atividade,monstro, ...props}) {
  const [open, setOpen] = useState(false);

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const status = [samurai,cool,awesome]
  return (

      <div className={styles.feed}>
        <div className={styles.titulo}>
      <img
          src={monstro}  
          alt="Monstro"  
          width={115}
          height={115}
        />
       <h1>{atividade.titulo}</h1>
       </div>
       <div className={styles.descricao}>
         <h2>Descrição: </h2>
         <p>{atividade.descricao}</p>
        </div>
        <div className={styles.dados}>           
        <div>
            <h2>Data de Entrega: </h2>
            <p>{'05/04/2022 as 23 horas'}</p>
          </div>
          <div>
            <h2>Tempo Restante: </h2>
            <p>{"26 horas"}</p>
          </div>
          <div>
            <h2>Última modificação: </h2>
            <p>Nada enviado</p>
          </div>
        </div>
        <div className={styles.dados}>           

          <div>
            <h2>Status: </h2>
            <p>Nada enviado</p>
          </div>
          <div>
            <h2>Nota: </h2>
            <p>Não avaliado</p>
          </div>
          
          <div className={styles.anexo} style={{backgroundColor: '#ADD8E6'}}>
          <h2>Arquivo: </h2>
          <Button   variant="outlined" startIcon={<FcUpload />}>
           Anexar Arquivo
        </Button>
       </div>
        </div>
      
     
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
                <Button onClick={handleClose}>Confirmar</Button>
              </DialogActions>
            </Dialog>
       </div>
      </div>      
  );
}

export default AtividadeCurso;
