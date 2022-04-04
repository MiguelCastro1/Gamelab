import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import {FcUpload, FcSportsMode} from "react-icons/fc";
import styles from "./styles.module.scss";
import {Button} from "@mui/material";
import cool from "../../assets/cool.gif"
import awesome from "../../assets/awesome.gif"
import samurai from "../../assets/samurai.gif"

function Atividade({atividade,monstros, ...props}) {

  const status = [samurai,cool,awesome]
  return (

      <div className={styles.feed}>
        <div className={styles.titulo}>
      <img
          src={monstros[atividade.imagem]}  
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
            <p>{atividade.dataEntrega}</p>
          </div>
          <div>
            <h2>Tempo Restante: </h2>
            <p>{atividade.dataEntrega}</p>
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
            <p>Nada enviado</p>
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
          height={120}
        />
       <Button  variant="outlined" >
           Enviar Atividade
        </Button>
       </div>
      </div>      
  );
}

export default Atividade;
