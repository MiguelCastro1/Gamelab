import { useField } from "formik";
// import styles from "./styles.scss";
import styles from "./styles.module.scss";

function Input({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className={styles.containerInput}>
      <input {...field} {...props} placeholder=" " />
      <span>{label}</span>
    </div>
  );
}

export default Input;
