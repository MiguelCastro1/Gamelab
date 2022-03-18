import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import HeaderAuth from "../../components/HeaderAuth";
import Input from "../../components/Input";
import { useTypePerfil } from "../../Context/PerfilContext";
import styles from "./styles.module.scss";

import aluno from "../../assets/aluno.svg";
import professor from "../../assets/professor.svg";
import { useState } from "react";
import api from "../../services/axios";

const formSchema = Yup.object().shape({
  email: Yup.string().email('Email Invalido').required("Campo obrigatório"),
  senha: Yup.string().min(8,'Senha precisa de mais de 8 letras').required("Campo obrigatório"),
  nome: Yup.string().max(100,'Limite atingido').required("Campo obrigatório"),
  matricula: Yup.number('Matricula invalida').required("Campo obrigatório"),
  instituicao: Yup.string().max(100,'Limite atingido').required("Campo obrigatório"),
  confirmacao_senha: Yup.string().required("Campo obrigatório")
    .oneOf([Yup.ref("senha"), null], "A senhas não são iguais"),
});

function FormCadastro() {
  let navigate = useNavigate();
  const { perfil } = useTypePerfil();

  const [erro, setErro] = useState('');

  const handleSubmit = (values, actions) => {
   // delete values['confirmacao_senha'];
   // let object = { ...values, tipoUsuario: perfil };
    console.log(perfil);
    try {
      api.post("/usuarios", object)
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch(erro => setErro('Email já cadastrado'))
    } catch (error) {
      setErro('Campos Inválidos')
      console.log(error);
    }
  };

  return (
    <>
      <HeaderAuth />
      <div className={styles.container}>
        <section>
          <h3>Sou {perfil === "aluno" ? "aluno" : "professor"}</h3>
          <img
            src={perfil === "aluno" ? aluno : professor}
            alt={perfil === "aluno" ? "aluno" : "professor"}
          />
        </section>
        <Formik
          initialValues={{
            nome: "",
            email: "",
            senha: "",
            matricula: "",
            instituicao: "",
            confirmacao_senha: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
        >
          {({ handleChange, ...props }) => (
            <Form>
              <main className={styles.content}>
                <div>
                  <Input label="Nome de usuário" name="nome" type="text" />
                  <Input
                    label="Número de Matrícula"
                    name="matricula"
                    type="text"
                    onChange={handleChange}
                  />
                  <Input
                    label="Nome da instituição"
                    name="instituicao"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    label="Endereço de E-mail"
                    name="email"
                    type="text"
                    onChange={handleChange}
                  />
                  <Input
                    label="Senha"
                    name="senha"
                    type="password"
                    onChange={handleChange}
                  />
                  <Input
                    label="Confirmação de senha"
                    name="confirmacao_senha"
                    type="password"
                    onChange={handleChange}
                  />
                  {erro && <div className={styles.erro}> {erro} </div>}
                  <button type="submit">Cadastrar</button>
                </div>
              </main>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default FormCadastro;
