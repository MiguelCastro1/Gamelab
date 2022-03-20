import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import HeaderAuth from "../../components/HeaderAuth";
import Input from "../../components/Input";
import { useTypePerfil } from "../../Context/PerfilContext";
import styles from "./styles.module.scss";
import { toast } from 'react-toastify';
import aluno from "../../assets/aluno.svg";
import professor from "../../assets/professor.svg";
import { useState } from "react";
import api from "../../services/axios";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Email Invalido").required("Campo obrigatório"),
  senha: Yup.string()
    .min(8, "Senha precisa de mais de 8 letras")
    .required("Campo obrigatório"),
  dataNascimento: Yup.string().required("Campo obrigatório"),
  nome: Yup.string().max(100, "Limite atingido").required("Campo obrigatório"),
  matricula: Yup.number("Matricula invalida").required("Campo obrigatório"),
  instituicao: Yup.string()
    .max(100, "Limite atingido")
    .required("Campo obrigatório"),
  confirmacao_senha: Yup.string()
    .required("Campo obrigatório")
    .oneOf([Yup.ref("senha"), null], "As senhas não são iguais"),
});

function FormCadastro() {
  let navigate = useNavigate();
  const { perfil } = useTypePerfil();

  const [erro, setErro] = useState("");

  const handleSubmit = async (values, actions) => {
    let object = {
      ...values,
      tipoUsuario: perfil,
      cidade: "",
      paisOrigem: "",
      dataIngresso: "",
      descricaoPerfil: "",
    };
    console.log(perfil)
    console.log(object);
    try {
      await api.post("/usuarios", object);
      toast("Cadastro Concluido com Sucesso")
      navigate("/login");
    } catch (error) {
      console.log(error);
 
      setErro("Email já cadastrado");
    }
  };

  return (
    <>
      <HeaderAuth />
      <div className={styles.container}>
        <Formik
          initialValues={{
            nome: "",
            email: "",
            dataNascimento: "",
            senha: "",
            matricula: "",
            instituicao: "",
            confirmacao_senha: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
        >
          {({ handleChange, values }) => (
            <Form>
              <main className={styles.content}>
                <section>
                  <h3>Sou {perfil === "aluno" ? "aluno" : "professor"}</h3>
                  <img
                    src={perfil === "aluno" ? aluno : professor}
                    alt={perfil === "aluno" ? "aluno" : "professor"}
                  />
                </section>
                <div className={styles.formContent}>
                  <Input
                    label="Nome de usuário"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                    type="text"
                    autoFocus={true}
                    estilo={{ marginBottom: "2.7rem" }}
                  />
                  <div className={styles.lineForm}>
                    <Input
                      label="Número de Matrícula"
                      name="matricula"
                      value={values.matricula}
                      type="text"
                      onChange={handleChange}
                    />
                    <Input
                      label="Data de nascimento"
                      name="dataNascimento"
                      value={values.dataNascimento}
                      type="date"
                      onChange={handleChange}
                      estilo={{ marginTop: "0" }}
                    />
                  </div>
                  <Input
                    label="Nome da instituição"
                    name="instituicao"
                    value={values.instituicao}
                    type="text"
                    onChange={handleChange}
                  />
                  <Input
                    label="Endereço de E-mail"
                    name="email"
                    value={values.email}
                    type="text"
                    onChange={handleChange}
                    estilo={{ marginBottom: "2.7rem" }}
                  />
                  <div className={styles.lineForm}>
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
                      estilo={{ marginTop: "0" }}
                    />
                  </div>
                  {/* {erro && <div className={styles.erro}> {erro} </div>} */}
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
