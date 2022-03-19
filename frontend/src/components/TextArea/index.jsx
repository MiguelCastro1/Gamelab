import { useField } from "formik";
import styles from "./styles.module.scss";

function TextArea({ label, estilo, disabled, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <div className={styles.containerInput} style={estilo ? estilo : {}}>
        <textarea
          {...field}
          {...props}
          style={{
            border: meta.touched && meta.error && "1px solid red",
            background: disabled ? "#E9ECEF" : null,
          }}
          disabled={disabled}
        />
        <span>{label}</span>
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error}</div>
        ) : null}
      </div>
    </>
  );
}

export default TextArea;
