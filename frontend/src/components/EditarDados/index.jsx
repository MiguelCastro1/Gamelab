import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import api from "../../services/axios";

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
  descricao: Yup.string().required("Campo obrigatório"),
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

  const handleSubmit = async (values) => {
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
                const { data } = await api.get(`cursos/update/${courseId}`);
                console.log('fetched data');
                console.log(data)
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
                        value={values.status}
                        type="checkbox"
                        onClick ={handleChange}
                       
                      />
                    </div>
                  </section>
                  <footer>
                    <button
                      style={{ opacity: "1" }}
                      className={styles.cancelar}
                      onClick={handleCancel}
                      type="button"
                    >
                      Cancelar
                    </button>
                    <button
                      style={{ opacity: "1" }}
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
