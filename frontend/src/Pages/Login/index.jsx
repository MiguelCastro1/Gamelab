import { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Header from "../../components/Header";
import gamelabLogin from "../../assets/image-gamelab.svg";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/axios";
import ErrorNotificationLogin from "../../components/ErrorNotificationLogin";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Email Invalido").required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
});

export default function Login() {
  let navigate = useNavigate();

  const [erro, setErro] = useState(false);
  const [isPass, setIsPass] = useState(false);

  const handleSubmit = async (values, actions) => {
    try {
      console.log("in");
      let {
        data: {
          user: { id, perfil, nome, email },
          token,
        },
      } = await api.post("/login", values);
      let dados = {
        id,
        perfil,
        nome,
        email,
        token,
      };
      localStorage.setItem("gamelab", JSON.stringify(dados));
      localStorage.setItem("local", "http://localhost:3333");
      navigate("/home");
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
          style={{ height: erro ? "25rem" : "22rem" }}
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
                  <div className={styles.togglePass}>
                    <Input
                      name="senha"
                      label={"Senha"}
                      type={!isPass ? "password" : "text"}
                      placeholder=" "
                      onChange={handleChange}
                      estilo={{ marginTop: "2.9rem" }}
                    />
                    <div
                      className={styles.boxIcon}
                      onClick={() => setIsPass(!isPass)}
                    >
                      {!isPass ? (
                        <MdOutlineVisibilityOff />
                      ) : (
                        <MdOutlineVisibility />
                      )}
                    </div>
                  </div>

                  {/* <div className={styles.link}> */}
                  <Link to="/email">
                    <span>Esqueceu a senha?</span>
                  </Link>
                  {/* </div> */}
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
