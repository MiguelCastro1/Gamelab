<<<<<<< HEAD
import { useField } from "formik";
// import styles from "./styles.scss";
import styles from "./styles.module.scss";

function Input({ label, placeholder, width, isForm, ...props }) {
  const [field, meta] = useField(props);
  // console.log(field, meta);

  return (
    <>
      <div
        className={styles.containerInput}
        style={{
          width,
          marginTop: isForm === "true" && 0,
        }}
      >
        <input
          {...field}
          {...props}
          placeholder={placeholder ? placeholder : ""}
          style={{
            border: meta.touched && meta.error && "1px solid red",
          }}
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
=======
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
>>>>>>> 6e8b9e8b23edc3f39918767f1fef958330ad467a
