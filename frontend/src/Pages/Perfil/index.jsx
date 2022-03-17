import { useEffect, useState } from "react";
import HeaderHome from "../../components/HeaderHome";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import imgUser from "../../assets/foto_prof.svg";
import Input from "../../components/Input";
import styles from "./styles.module.scss";
import { FiEdit2, FiArrowLeft } from "react-icons/fi";
import { parseJwt } from "../../services/decodedToken";
import { getToken } from "../../services/auth";
import api from "../../services/axios";

const fields = ["nome", "email", "senha", "matricula", "instituicao"];

function Perfil() {
  let navigate = useNavigate();
  const [flagReset, setFlagReset] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  let id = getToken()
    ? parseJwt(JSON.parse(localStorage.getItem("gamelab")).token).id
    : null;

  const handleCancel = () => {
    setFlagReset(!flagReset);
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
          }}
          //   onSubmit={handleSubmit}
          //   validationSchema={formSchema}
        >
          {function ShowForm({ values, handleChange, setFieldValue }) {
            useEffect(() => {
              async function fetchItemsDetails() {
                const { data } = await api.get(`usuarios/${id}`);
                console.log(data.doc);
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
                        <p>Alterar imagem</p>
                        <input type="file" value="" />
                      </div>
                    </div>
                    <div>
                      <div className={styles.lineForm}>
                        <Input
                          label="Nome de usuário"
                          name="nome"
                          value={values.nome}
                          onChange={handleChange}
                          type="text"
                          disabled={isEdit}
                          autoFocus={true}
                        />
                        <Input
                          label="Número de Matrícula"
                          name="matricula"
                          value={values.matricula}
                          type="text"
                          onChange={handleChange}
                          estilo={{ marginTop: "0" }}
                          disabled={isEdit}
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
                    </div>
                  </section>
                  <footer>
                    {!isEdit && (
                      <>
                        <button
                          className={styles.cancelar}
                          type="submit"
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
