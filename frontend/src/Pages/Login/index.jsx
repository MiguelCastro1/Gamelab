import { Formik, Form } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import gamelabLogin from "../../assets/image-gamelab.svg";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { useTypePerfil } from "../../Context/PerfilContext";
import { useState, useContext, useEffect} from "react";


const formSchema = Yup.object().shape({
  email: Yup.string().email('Email Invalido').required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
});

export default function Login() {
  let navigate = useNavigate();

  const [erro, setErro] = useState(false);
  const {perfil, setPerfil} = useTypePerfil();

  useEffect(() => {
    console.log(perfil);  
  },[perfil]);

  const handleSubmit = (values, actions) => {
    try {
      api.post("/login", values)
      .then((user) => {
        const payload   = {
          id: user.data.user.id,
          perfil: user.data.user.perfil,
          nome: user.data.user.nome,
          email: user.data.user.email 
        }
        localStorage.setItem("gamelab",user.data.token);
        setPerfil(payload);
        navigate('/');
      })
      .catch(erro => setErro(true))
    } catch (error) {
      setErro(true)
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
                  <div>{erro && <div className={styles.erro}> Email ou senha incorretos </div>}</div>
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
