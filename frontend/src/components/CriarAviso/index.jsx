import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import styles from "./styles.module.scss";

function CriarAviso({courseId, ...props}) {
  return (

      <div className={styles.feed}>
        <h1>Criar Aviso</h1>
      </div>      
  );
}

export default CriarAviso;
