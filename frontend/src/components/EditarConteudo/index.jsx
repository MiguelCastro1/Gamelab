import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import styles from "./styles.module.scss";

function EditarConteudo({curso, ...props}) {
  return (

      <div className={styles.feed}>
        <h1>Editar Conteudo</h1>
      </div>      
  );
}

export default EditarConteudo;
