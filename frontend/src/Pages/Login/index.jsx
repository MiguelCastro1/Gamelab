import { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import gamelabLogin from "../../assets/image-gamelab.svg";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import ErrorNotificationLogin from "../../components/ErrorNotificationLogin";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Email Invalido").required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
});

export default function Login() {
  let navigate = useNavigate();

  const [erro, setErro] = useState(false);

  const handleSubmit = async (values, actions) => {
    try {
      let {
        data: {
          user: { perfil, nome, email },
          token,
        },
      } = await api.post("/login", values);
      let dados = {
        perfil,
        nome,
        email,
        token,
      };
      console.log(dados);
      localStorage.setItem("gamelab", JSON.stringify(dados));
      navigate("/");
    } catch (error) {
      setErro(true);
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
        <div
          style={{ height: erro ? "23.8rem" : "22rem" }}
          className={styles.content}
        >
          <div className={styles.boxForm}>
            <h3 style={{ marginBottom: erro ? "1rem" : "2.2rem" }}>
              Bem-vindo
            </h3>
            {erro && <ErrorNotificationLogin />}
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
                  {/* <div>{erro && <div className={styles.erro}> Email ou senha incorretos </div>}</div> */}
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
