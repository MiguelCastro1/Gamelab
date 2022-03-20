import { useEffect, useState } from "react";
import HeaderHome from "../../components/HeaderHome";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import imgUser from "../../assets/user_padrao.png";
import Input from "../../components/Input";
import styles from "./styles.module.scss";
import { FiEdit2, FiArrowLeft } from "react-icons/fi";
//import { parseJwt } from "../../services/decodedToken";
import { getToken } from "../../services/auth";
import api from "../../services/axios";
import TextArea from "../../components/TextArea";

const fields = [
  "nome",
  "email",
  "senha",
  "matricula",
  "instituicao",
  "dataNascimento",
  "cidade",
  "paisOrigem",
  "dataIngresso",
  "descricaoPerfil",
];

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

function Perfil() {
  let navigate = useNavigate();
  const [flagReset, setFlagReset] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  const {id} = localStorage.getItem("gamelab")? JSON.parse(localStorage.getItem("gamelab")): null;

  const handleCancel = () => {
    setFlagReset(!flagReset);
    setIsEdit(!setIsEdit)
  };

  const handleSubmit = async (values, actions) => {
    console.log("getin")
    console.log(values);
    // try {
    //   await api.patch(`usuarios/${id}`, values);
    //   setIsEdit(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <h1> Perfil</h1>
        <Formik
          initialValues={{
            nome: "",
            email: "",
            senha: "",
            matricula: "",
            instituicao: "",
            dataNascimento: "",
            cidade: "",
            paisOrigem: "",
            dataIngresso: "",
            descricaoPerfil: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
        >
          {function ShowForm({ values, handleChange, setFieldValue }) {
            useEffect(() => {
              async function fetchItemsDetails() {
                const { data } = await api.get(`usuarios/${id}`);
                fields.forEach((field) => {
                  setFieldValue(field, data.doc[field], false);
                });
              }
              fetchItemsDetails();
            }, [setFieldValue, flagReset]);

            return (
              <Form>
                <main className={styles.content}>
                  <header>
                    <div className={styles.icons} onClick={() => navigate("/")}>
                      <FiArrowLeft size="1.3rem" />
                    </div>
                    <div
                      onClick={() => setIsEdit(!isEdit)}
                      className={styles.icons}
                    >
                      <FiEdit2 size="1.3rem" />
                    </div>
                  </header>
                  <section>
                    <div
                      className={styles.formContent}
                      style={{ width: "65%" }}
                    >
                      <img src={imgUser} alt="imagem usuário" />
                      <div className={styles.submitImage}>
                        <p>
                          Alterar imagem <FiEdit2 />{" "}
                        </p>
                        <input type="file" value="" />
                      </div>
                    </div>
                    <div>
                      <Input
                        label="Nome de usuário"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange}
                        type="text"
                        disabled={isEdit}
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
                          disabled={isEdit}
                        />
                        <Input
                          label="Data de nascimento"
                          name="dataNascimento"
                          value={values.dataNascimento}
                          type="date"
                          onChange={handleChange}
                          disabled={isEdit}
                          estilo={{ marginTop: "0" }}
                        />
                      </div>
                      <Input
                        label="Nome da instituição"
                        name="instituicao"
                        value={values.instituicao}
                        type="text"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                      <Input
                        label="Endereço de E-mail"
                        name="email"
                        value={values.email}
                        type="text"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                      <Input
                        label="Cidade"
                        name="cidade"
                        value={values.cidade}
                        type="text"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                      <Input
                        label="País de origem"
                        name="paisOrigem"
                        value={values.paisOrigem}
                        type="text"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                      <Input
                        label="Data de ingresso"
                        name="dataIngresso"
                        value={values.dataIngresso}
                        type="date"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                      {/* <TextArea
                        label="Descrição de perfil"
                        name="descricaoPerfil"
                        value={values.descricaoPerfil}
                        onChange={handleChange}
                        disabled={isEdit}
                      /> */}
                    </div>
                  </section>
                  <footer>
                    {!isEdit && (
                      <>
                        <button
                          className={styles.cancelar}
                          onClick={handleCancel}
                        >
                          Cancelar
                        </button>
                        <button className={styles.salvar} type="submit">
                          Editar
                        </button>
                      </>
                    )}
                  </footer>
                </main>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default Perfil;
