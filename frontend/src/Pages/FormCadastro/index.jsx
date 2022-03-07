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
  email: Yup.string().required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
  nome: Yup.string().required("Campo obrigatório"),
  matricula: Yup.string().required("Campo obrigatório"),
  instituicao: Yup.string().required("Campo obrigatório"),
  confirmacao_senha: Yup.string()
    .required("Campo obrigatório")
    .oneOf([Yup.ref("senha"), null], "A senhas não são iguais"),
});

function FormCadastro() {
  let navigate = useNavigate();
  const { perfil } = useTypePerfil();

  const [erro, setErro] = useState(false);

  const handleSubmit = async (values, actions) => {
    let object = { ...values, tipoUsuario: perfil };
    console.log(perfil);
    try {
      const { data } = await api.post("/usuarios", object);
      console.log(data);
      navigate("/login");
    } catch (error) {
      // setStatus(400);
      console.log(error);
    }
  };

  return (
    <>
      <HeaderAuth />
      <div className={styles.container}>
        <section>
          <p>Sou {perfil === "aluno" ? "aluno" : "professor"}</p>
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
                  {erro && <div> 'Campos Inválidos' </div>}
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
