import Header from "../../components/Header";
import gamelabLogin from "../../assets/image-gamelab.svg";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  return (
    <div className={styles.containerWrapper}>
      <Header />
      <div className={styles.container}>
        <section className={styles.title}>
          <h1>GameLab</h1>
          <p>Crie sua turma e faça seus alunos se divertirem.</p>
        </section>
        <div className={styles.content}>
          <div className={styles.boxForm}>
            <h3>Bem-vindo</h3>
            <Input label={"E-mail"} required />
            <Input label={"Senha"} required />
            <a href="#">Esqueceu a senha?</a>
            <button onClick={() => navigate("/")}>Entrar</button>
          </div>
          <img src={gamelabLogin} alt="gamelab login" />
        </div>
      </div>
    </div>
  );
}
