import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import {FcUpload, FcSportsMode} from "react-icons/fc";
import styles from "./styles.module.scss";
import {Button} from "@mui/material";
function Atividade({atividade, ...props}) {
  return (

      <div className={styles.feed}>
       <h1>{atividade.titulo}</h1>
       <div>
         <h2>Descrição</h2>
         <p>{atividade.descricao}</p>
         <p>Data de Entraga: {atividade.dataEntrega}</p>
       </div>
       <div>
       <Button onClick={() => navigate('/kanban')}  variant="outlined" startIcon={<FcUpload />}>
           Anexar Arquivo
        </Button>
       </div>
       <div>
       <Button onClick={() => navigate('/kanban')}  variant="outlined" startIcon={<FcSportsMode />}>
           Enviar Atividade
        </Button>
       </div>
      </div>      
  );
}

export default Atividade;
