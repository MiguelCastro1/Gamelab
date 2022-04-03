import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import styles from "./styles.module.scss";

function Atividade({atividade, ...props}) {
  return (

      <div className={styles.feed}>
       <h1>{atividade.titulo}</h1>
      </div>      
  );
}

export default Atividade;
