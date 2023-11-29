import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png";
import BoxTurma from "../BoxTurma";
import styles from "./styles.module.scss";
import passaro from "../../assets/passado.webp"
function ContentHome({resultados, ...props}) {

  return (

      <div className={styles.feed}>
       <h1>Minhas turmas</h1>
       {typeof resultados !== 'undefined' && resultados.length == 0 && 
       <img
        src={`${passaro}`}
            alt="nenhuma turma"
            width={500} height={500}
          />
          }
        {resultados.map((turma) => (
            <Link key={turma._id} to = {`/curso/${turma._id}`}>
              <BoxTurma
                nomeTurma={turma.nomeCurso}
                professor={turma.autorId.nome}
                descricao={turma.descricao}
              />
            </Link>
        ))}
      </div>      
  );
}

export default ContentHome;
