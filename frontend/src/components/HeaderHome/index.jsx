import styles from "./styles.module.scss";
import imgUser from "../../assets/foto_prof.svg";

function HeaderHome() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1>GameLab</h1>
        <div className={styles.areaUser}>
          <a href="#">Matheus Matos</a>
          <img src={imgUser} alt="usuário" />
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
