import HeaderAuth from "../../components/HeaderAuth";
import styles from "./styles.module.scss";
import aluno from "../../assets/aluno.svg";
import professor from "../../assets/professor.svg";
import { useNavigate } from "react-router-dom";
import { useTypePerfil } from "../../Context/PerfilContext";

function EscolherPerfil() {
  let navigate = useNavigate();
  const { setPerfil } = useTypePerfil();

  const setPerfilUsuario = (perfil) => {
    setPerfil(perfil);
    navigate("/cadastrar-perfil");
  };

  return (
    <>
      <HeaderAuth />
      <div className={styles.container}>
        <p>Você é aluno ou professor?</p>
        <div className={styles.switchPerfil}>
          <section onClick={() => setPerfilUsuario("aluno")}>
            <img src={aluno} alt="aluno" />
            <p>Aluno</p>
          </section>
          <section onClick={() => setPerfilUsuario("professor")}>
            <img src={professor} alt="professor" />
            <p>Professor</p>
          </section>
        </div>
      </div>
    </>
  );
}

export default EscolherPerfil;
