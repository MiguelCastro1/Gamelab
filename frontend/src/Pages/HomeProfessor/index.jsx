import HeaderHome from "../../components/HeaderHome";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";

function HomeProfessor() {
  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.feed}>
            <h1>Meus cursos</h1>
          </div>
          <div className={styles.sideBarRight}></div>
        </div>
      </div>
    </>
  );
}

export default HomeProfessor;
