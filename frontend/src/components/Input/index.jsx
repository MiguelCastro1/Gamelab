import { useField } from "formik";
// import styles from "./styles.scss";
import styles from "./styles.module.scss";

function Input({ label, placeholder, estilo, disabled, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <div className={styles.containerInput} style={estilo ? estilo : {}}>
        <input
          {...field}
          {...props}
          placeholder={placeholder ? placeholder : ""}
          style={{
            border: meta.touched && meta.error && "1px solid red",
            borderColor: disabled ? "#c3c3c3" : null,
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

export default Input;
