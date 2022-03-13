import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link to='/sobre'> Sobre nós </Link>
        <Link to="/cadastrar">
          <button>Criar conta</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
