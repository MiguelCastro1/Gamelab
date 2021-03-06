import styles from "./styles.module.scss";

export default function ProgressBar({ progressBar }) {
  return (
    <div className={styles.container}>
      <p>0xp</p>
      <div className={styles.baseProgress}>
        <div
          style={{ width: `${progressBar}%` }}
          className={styles.progressBar}
        ></div>
      </div>
      <p>100xp</p>
    </div>
  );
}
