import { AiOutlineStar } from "react-icons/ai";
import styles from "./styles.module.scss";
import {FcGraduationCap} from "react-icons/fc";
function BoxTurma({ nomeTurma, professor, descricao, ...props }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>
          <h3>{nomeTurma}</h3>
          <FcGraduationCap size={25}/>
          {/* <AiOutlineStar
            style={{ cursor: "pointer", color: "var(--blue-700)" }}
          /> */}
        </section>
        <section>
          <p>
            <span>professor:</span> {professor} 
          </p>
          <p className={styles.descricao}>
            <span>Descrição:</span> {descricao}
          </p>
        </section>
      </div>
    </div>
  );
}

export default BoxTurma;
