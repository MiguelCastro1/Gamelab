import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import styles from "./styles.module.scss";
import {FcConferenceCall} from 'react-icons/fc'
function Participantes({Alunos, ...props}) {
  return (

      <div className={styles.feed}>
        <h1> <FcConferenceCall size={35}/>{" "}Participantes</h1>
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