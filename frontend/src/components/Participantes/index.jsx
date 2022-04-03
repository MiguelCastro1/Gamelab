import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import styles from "./styles.module.scss";

function Participantes({Alunos, ...props}) {
  return (

      <div className={styles.feed}>
      {Alunos.map((aluno) => (
          <Link key={aluno.userId._id} to={`/perfil/${aluno.userId._id}`}>
          <div  className={styles.aluno}>
            <img 
              src={userPhoto}  
              alt="Perfil"
              width={50}
              height={50}
              />
            <h2 > {aluno.userId.nome} </h2>
          </div>
        </Link> 
        ))}
      </div>      
  );
}

export default Participantes;
