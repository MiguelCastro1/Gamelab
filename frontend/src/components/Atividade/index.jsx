import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import {FcUpload, FcSportsMode} from "react-icons/fc";
import styles from "./styles.module.scss";
import {Button} from "@mui/material";
function Atividade({atividade,monstros, ...props}) {
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
         <div>
         <h2>Descrição: </h2>
         <p>{atividade.descricao}</p>
         </div>
         <div>
         <h2>Status: </h2>
         <p>Nada enviado</p>
         </div>
         <div>
         <h2>Data de Entrega: </h2>
         <p>{atividade.dataEntrega}</p>
         </div>
        </div>
       <div className={styles.anexo}>
       <Button onClick={() => navigate('/home')}  variant="outlined" startIcon={<FcUpload />}>
           Anexar Arquivo
        </Button>
       </div>
       <div className={styles.enviar}>
       <Button onClick={() => navigate('/home')}  variant="outlined" startIcon={<FcSportsMode />}>
           Enviar Atividade
        </Button>
       </div>
      </div>      
  );
}

export default Atividade;
