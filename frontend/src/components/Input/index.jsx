import styles from "./styles.module.scss";

function Input({ label, ...rest }) {
  return (
    <div className={styles.container}>
      <input type="text" {...rest} />
      <span>{label}</span>
    </div>
  );
}

export default Input;
