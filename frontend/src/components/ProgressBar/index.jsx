import styles from "./styles.module.scss";

export default function ProgressBar({ progressBar }) {
  return (
    <div className={styles.container}>
      <p>17xp</p>
      <p className={styles.baseProgress}>
        <p
          style={{ width: `${progressBar}%` }}
          className={styles.progressBar}
        ></p>
      </p>
      <p>35xp</p>
    </div>
  );
}
