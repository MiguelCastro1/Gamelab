import { useState } from "react";
import HeaderAuth from "../../components/HeaderAuth";
import styles from "./styles.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import emailEnviado from "../../assets/send-mail.svg";
import Input from "../../components/Input";
import api from "../../services/axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const formSchema = Yup.object().shape({
  novasenha: Yup.string()
    .min(8, "Senha deve possuir ao menos 8 caracteres")
    .required("Campo obrigatório"),
  confirmar: Yup.string()
    .required("Campo obrigatório")
    .oneOf([Yup.ref("novasenha"), null], "As senhas não são iguais"),
});

function ResetarSenha() {
  const [senhaChange, setSenhaChange] = useState(false);
  let token = window.location.href.split("_token=")[1];

  const handleSubmit = async (values) => {
    let data = { ...values, token };
    try {
      await api.patch("/resetarsenha", data);
      toast.success("Senha alterada com sucesso");
      setSenhaChange(true);
    } catch (error) {
      toast.error("O link foi expirado");
    }
  };

  return (
    <>
      <HeaderAuth />
      <div className={styles.container}>
        {/* <h2>Esqueceu sua senha?</h2>
          <p>Entre com seu email que enviaremos uma mensagem para você.</p> */}
        <Formik
          initialValues={{
            novasenha: "",
            confirmar: "",
          }}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {function showForm({ values, handleChange }) {
            return (
              <Form className={styles.formContainer}>
                <Input
                  label="Nova senha"
                  name="novasenha"
                  value={values.novasenha}
                  onChange={handleChange}
                  type="password"
                  autoFocus={true}
                />
                <Input
                  label="Confirmar nova senha"
                  name="confirmar"
                  value={values.confirmar}
                  onChange={handleChange}
                  type="password"
                />
                {!senhaChange ? (
                  <button className={styles.button} type="submit">
                    Salvar
                  </button>
                ) : (
                  <Link to="/login">
                    <p className={styles.linkLogin}>Ir para login</p>
                  </Link>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default ResetarSenha;
