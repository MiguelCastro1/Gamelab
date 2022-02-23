import HeaderAuth from "../../components/HeaderAuth";
import styles from "./styles.module.scss";
import emailEnviado from "../../assets/send-mail.svg";

function EmailEnviado() {
  return (
    <>
      <HeaderAuth />
      <div className={styles.container}>
        <p>
          Verifique sua caixa de entrada, enviamos um e-mail de confirmação de
          cadastro.
        </p>
        <img src={emailEnviado} alt="email enviado" />
      </div>
    </>
  );
}

export default EmailEnviado;
