import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link to='/sobre'> <b>Sobre nós</b> </Link>
        <Link to="/cadastrar"> <button><b>Criar conta</b></button></Link>
      </div>
    </header>
  );
}

export default Header;
