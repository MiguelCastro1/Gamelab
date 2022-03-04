import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import HeaderAuth from "../../components/HeaderAuth";
import Input from "../../components/Input";
import { useTypePerfil } from "../../Context/PerfilContext";
import styles from "./styles.module.scss";

import aluno from "../../assets/aluno.svg";
import professor from "../../assets/professor.svg";

const formSchema = Yup.object().shape({
  email: Yup.string().required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
  usuario: Yup.string().required("Campo obrigatório"),
  matricula: Yup.string().required("Campo obrigatório"),
  instituicao: Yup.string().required("Campo obrigatório"),
  confirmacao_senha: Yup.string().required("Campo obrigatório"),
});

function FormCadastro() {
  let navigate = useNavigate();
  const { perfil } = useTypePerfil();
  console.log("render");

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
            email: "",
            senha: "",
            usuario: "",
            matricula: "",
            instituicao: "",
            confirmacao_senha: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={formSchema}
        >
          {({ handleChange, ...props }) => (
            <Form>
              <main className={styles.content}>
                <div>
                  <Input label="Nome de usuário" name="usuario" type="text" />
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
                    type="text"
                    onChange={handleChange}
                  />
                  <Input
                    label="Confirmação de senha"
                    name="confirmacao_senha"
                    type="text"
                    onChange={handleChange}
                  />
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
