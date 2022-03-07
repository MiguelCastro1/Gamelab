import { Formik, Form } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import gamelabLogin from "../../assets/image-gamelab.svg";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/axios";

const formSchema = Yup.object().shape({
  email: Yup.string().required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
});

export default function Login() {
  let navigate = useNavigate();

  const [erro, setErro] = useState(false);

  const handleSubmit = async (values, actions) => {
    try {
      const { data } = await api.post("/login", values);
      localStorage.setItem("gamelab", data.token);
      navigate("/");
    } catch (error) {
      // setStatus(400);
      console.log(error);
    }
  };

  return (
    <div className={styles.containerWrapper}>
      <Header />
      <div className={styles.container}>
        <section className={styles.title}>
          <h1>GameLab</h1>
          <p>Crie sua turma e faça seus alunos se divertirem.</p>
        </section>
        <div className={styles.content}>
          <div className={styles.boxForm}>
            <h3>Bem-vindo</h3>
            <Formik
              initialValues={{
                email: "",
                senha: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={formSchema}
            >
              {({ handleChange, ...props }) => (
                <Form>
                  <Input
                    name="email"
                    label={"E-mail"}
                    type="text"
                    onChange={handleChange}
                    placeholder=" "
                  />
                  <Input
                    name="senha"
                    label={"Senha"}
                    type="password"
                    placeholder=" "
                    onChange={handleChange}
                  />
                  <div>
                    <a href="#">Esqueceu a senha?</a>
                  </div>
                  <div>{erro && <div> 'Email ou senha incorretos' </div>}</div>
                  <button type="submit">Entrar</button>
                </Form>
              )}
            </Formik>
          </div>
          <img src={gamelabLogin} alt="gamelab login" />
        </div>
      </div>
    </div>
  );
}
