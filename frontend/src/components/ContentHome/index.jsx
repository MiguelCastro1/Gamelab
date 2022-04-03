import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png";
import BoxTurma from "../BoxTurma";
import styles from "./styles.module.scss";

function ContentHome({resultados, ...props}) {
  return (

      <div className={styles.feed}>
       <h1>Minhas turmas</h1>
        {resultados.map((turma) => (
            <Link key={turma._id} to = {`/curso/${turma._id}`}>
              <BoxTurma
                nomeTurma={turma.nomeCurso}
                professor={turma.autorEmail}
                descricao={turma.descricao}
              />
            </Link>
        ))}
      </div>      
  );
}

export default ContentHome;
