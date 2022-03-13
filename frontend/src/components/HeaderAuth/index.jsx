// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function HeaderAuth() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
       <Link to='/login'> <h1>GameLab</h1> </Link> 
      </div>
    </header>
  );
}

export default HeaderAuth;
