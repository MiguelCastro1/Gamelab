import { useEffect, useState } from "react";
import HeaderHome from "../../components/HeaderHome";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import styles from "./styles.module.scss";
import { FiEdit2, FiArrowLeft } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import api from "../../services/axios";
import TextArea from "../../components/TextArea";
import { Button, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import imagePadrao from "../../assets/user_padrao.png";

const fields = [
  'nomeCurso',
  'materia',
  'descricao',
  'codigo',
  'senha',
  'ativo',
];

const formSchema = Yup.object().shape({
  nomeCurso: Yup.string().max(100, "Limite atingido").required("Campo obrigatório"),
  materia: Yup.string().max(100, "Limite atingido"),
  descricao: Yup.string().max(100, "Limite atingido").required("Campo obrigatório"),
  codigo: Yup.string().max(10, "Limite atingido"),
  senha: Yup.string().max(10, "Limite atingido"),
  ativo: Yup.string().max(10, "Limite atingido")
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
};


function EditarDados({courseId, ...props}) {
  const [flagReset, setFlagReset] = useState(true);
  const [isEdit, setIsEdit] = useState(true); 
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setFlagReset(!flagReset);
    setIsEdit(!isEdit);
  };

  const handleSubmit = async () => {
    try {
      await api.patch(`cursos/${courseId}`, values);
      setIsEdit(true);
      toast.success("Campos editados com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar seus dados");
    }
  };

  const handleOpen = () => setOpen(true);

  return (
      <div className={styles.feed}>
        <h1>Editar Dados</h1>
        <Formik
          initialValues={{
            nomeCurso: "",
            materia: "",
            descricao: "",
            codigo: "",
            senha: "",
            ativo: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
        >
          {function ShowForm({ values, handleChange, setFieldValue }) {
            useEffect(() => {
              async function fetchItemsDetails() {
                const { data } = await api.get(`cursos/${courseId}`);
                fields.forEach((field) => {
                  setFieldValue(field, data.doc[field], false);
                });
              }
              fetchItemsDetails();
            }, [setFieldValue, flagReset]);

            return (
              <Form>
                <main className={styles.content}>
                  <section>
                    <div>
                      <Input
                        label="Nome do Curso"
                        name="nomeCurso"
                        value={values.nomeCurso}
                        onChange={handleChange}
                        type="text"
                        autoFocus={true}
                        estilo={{ marginBottom: "2.7rem" }}
                      />
                       <Input
                        label="Materia"
                        name="materia"
                        value={values.materia}
                        type="text"
                        onChange={handleChange}
                      />
                        <Input
                        label="Descrição"
                        name="descricao"
                        value={values.descricao}
                        type="text"
                        onChange={handleChange}
                      />
                    
                      <Input
                        label="Código"
                        name="codigo"
                        value={values.codigo}
                        type="text"
                        onChange={handleChange}
                      />
                      <Input
                        label="Senha"
                        name="senha"
                        value={values.senha}
                        type="text"
                        onChange={handleChange}
                      />
                      <Input
                        label="Status"
                        name="ativo"
                        value={values.ativo}
                        type="text"
                        onChange={handleChange}
                        disabled={isEdit}
                      />
                    </div>
                  </section>
                  <footer>
                    <button
                      style={{ opacity: !isEdit ? "1" : 0 }}
                      className={styles.cancelar}
                      onClick={handleCancel}
                      type="button"
                    >
                      Cancelar
                    </button>
                    <button
                      style={{ opacity: !isEdit ? "1" : 0 }}
                      className={styles.salvar}
                      type="submit"
                    >
                      Salvar
                    </button>
                  </footer>
                </main>
              </Form>
            );
          }}
        </Formik>
      </div>    
  );
}

export default EditarDados;
