import { useNavigate } from "react-router-dom";
import HeaderAuth from "../../components/HeaderAuth";
import Input from "../../components/Input";
import { useTypePerfil } from "../../Context/PerfilContext";
import styles from "./styles.module.scss";

import aluno from "../../assets/aluno.svg";
import professor from "../../assets/professor.svg";

function Form() {
  let navigate = useNavigate();
  const { perfil } = useTypePerfil();

  return (
    <>
      <HeaderAuth />
      <div className={styles.container}>
        <p>Sou {perfil === "aluno" ? "aluno" : "professor"}</p>
        <main className={styles.content}>
          <div>
            <Input label="Nome de usuário" required />
            <Input label="Número de Matrícula" required />
            <Input label="Nome da instituição" required />
          </div>
          <div>
            <Input label="Endereço de E-mail" required />
            <Input label="Senha" required />
            <Input label="Confirmação de senha" required />
            <button onClick={() => navigate("/email")}>Cadastrar</button>
          </div>
        </main>
        <img
          src={perfil === "aluno" ? aluno : professor}
          alt={perfil === "aluno" ? "aluno" : "professor"}
        />
      </div>
    </>
  );
}

export default Form;
