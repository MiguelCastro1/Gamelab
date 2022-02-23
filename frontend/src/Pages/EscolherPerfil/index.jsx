import HeaderAuth from "../../components/HeaderAuth";
import styles from "./styles.module.scss";
import aluno from "../../assets/aluno.svg";
import professor from "../../assets/professor.svg";
import { useNavigate } from "react-router-dom";
import { useTypePerfil } from "../../Context/PerfilContext";

function EscolherPerfil() {
  let navigate = useNavigate();
  const { setPerfil } = useTypePerfil();

  const setProfessor = () => {
    setPerfil("professor");
    navigate("/cadastrar-form");
  };

  const setAluno = () => {
    setPerfil("aluno");
    navigate("/cadastrar-form");
  };

  return (
    <>
      <HeaderAuth />
      <div className={styles.container}>
        <p>Você é aluno ou professor?</p>
        <div className={styles.switchPerfil}>
          <section onClick={setAluno}>
            <img src={aluno} alt="aluno" />
            <p>Aluno</p>
          </section>
          <section onClick={setProfessor}>
            <img src={professor} alt="professor" />
            <p>Professor</p>
          </section>
        </div>
      </div>
    </>
  );
}

export default EscolherPerfil;
