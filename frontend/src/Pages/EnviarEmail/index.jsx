import { useState } from "react";
import HeaderAuth from "../../components/HeaderAuth";
import styles from "./styles.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import emailEnviado from "../../assets/send-mail.svg";
import Input from "../../components/Input";
import api from "../../services/axios";
import { toast } from "react-toastify";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Email Invalido").required("Campo obrigatório"),
});

function EnviarEmail() {
  const [emailSend, setEmailSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await api.post("/envioemail", values);
      setEmailSend(true);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar email");
    }
    setEmailSend(true);
  };

  if (!emailSend) {
    return (
      <>
        <HeaderAuth />
        <div className={styles.container}>
          <h2>Esqueceu sua senha?</h2>
          <p>Entre com seu email que enviaremos uma mensagem para você.</p>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {function showForm({ values, handleChange }) {
              return (
                <Form className={styles.formContainer}>
                  <Input
                    label="E-mail"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="text"
                    autoFocus={true}
                  />
                  <button
                    className={styles.button}
                    style={{ opacity: loading ? 0.65 : 1 }}
                  >
                    {loading ? "Enviando..." : "Enviar"}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderAuth />
      <div className={styles.container}>
        <p>
          Verifique sua caixa de entrada, enviamos um e-mail com o passo para
          recuperar sua senha.
        </p>
        <img src={emailEnviado} alt="email enviado" />
      </div>
    </>
  );
}

export default EnviarEmail;
