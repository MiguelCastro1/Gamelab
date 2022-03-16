import { BiErrorCircle } from "react-icons/bi";
import styles from "./styles.module.scss";

function ErrorNotificationLogin() {
  return (
    <div className={styles.containerErrorLogin}>
      <p>
        Usuário e/ou senha incorretos
        <BiErrorCircle size={20} color={"red"} />
      </p>
    </div>
  );
}

export default ErrorNotificationLogin;
