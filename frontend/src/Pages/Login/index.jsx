import { Formik, Form } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import gamelabLogin from "../../assets/image-gamelab.svg";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useState} from "react";

const formSchema = Yup.object().shape({
  email: Yup.string().required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
});

export default function Login() {
  let navigate = useNavigate();

  const [erro,setErro] = useState(false)

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
              onSubmit={(values) => {
                // Without Backend
                console.log(values);
                navigate('/home')

                // With Backend
               /* fetch(`http://localhost:5000/login`, {
                  credentials : 'include',
                  method: 'POST',
                  headers:  {'Content-Type': 'application/json'},
                  body: JSON.stringify(values)
                })
                .then(resp => {
                  console.log(resp)
                  if(resp.status == 401)
                    setErro(true)
                  return resp.json()
                })
                .then(json => {
                  console.log(json)
                  if(erro === false)
                    navigate('/home')
                })
                */
               
              }}
              validationSchema={formSchema}
            >
              {({ handleChange, ...props }) => (
                <Form>
                  <Input
                    name="email"             
                    label={"E-mail"}
                    type="text"
                    onChange={handleChange}
                   
                  />
                  <Input
                    name="senha"
                    label={"Senha"}
                    type="password"
                    onChange={handleChange}
                  />
                  <div>
                    <a href="#">Esqueceu a senha?</a>
                  </div>
                  <div>
                    {erro ? <div> 'Email ou senha incorretos' </div> : <div> '' </div> }
                  </div>
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
