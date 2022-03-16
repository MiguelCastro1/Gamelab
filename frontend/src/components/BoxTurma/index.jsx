import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import styles from "./styles.module.scss";

function BoxTurma({ nomeTurma, professor, descricao, ...props }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>
          <h3>{nomeTurma}</h3>
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
