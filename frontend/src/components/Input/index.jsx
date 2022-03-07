import { useField } from "formik";
// import styles from "./styles.scss";
import styles from "./styles.module.scss";

function Input({label,  ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <div className={styles.containerInput}>
        <input
          {...field}
          {...props}
          style={{ border: meta.touched && meta.error && "1px solid red" }}
        />
        <span>{label}</span>
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error}</div>
        ) : null}
      </div>
      <></>
    </>
  );
}

export default Input;
