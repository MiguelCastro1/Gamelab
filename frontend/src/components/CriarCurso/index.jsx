import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import { getToken } from "../../services/auth";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const formSchema = Yup.object().shape({
  nomeCurso: Yup.string().required("Campo obrigatório"),
  descricao: Yup.string().required("Campo obrigatório"),
 // codigo: Yup.string().max(10, "Limite atingido").required("Campo obrigatório"),
  confirmacao_senha: Yup.string()
    .oneOf([Yup.ref("senha"), null], "As senhas não são iguais"),
});

function CriarCurso() {
  const [open, setOpen] = useState(false);
  const [habilitado, setHabilitado] = useState(-1);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  let { id, email } = getToken() ? JSON.parse(getToken()) : null;
  const handleSubmit = async (values, actions) => {
      let object = {
        ...values,
        autorEmail: email,
        autorId: id
      };
      console.log(object);
    
      try {
        await api.post("/cursos", object);
        console.log('done')
        toast.success("Curso criado com Sucesso")
        navigate(`/curso/${course_id}`)
      } catch (error) {
        toast.error("Algum erro ocorreu")
        console.log(error);
      }
    };
  
  return (
      <div className={styles.feed}>

          <h1 className="C">Criar Turma</h1>
            <Formik initialValues={{
            nomeCurso: "",
            materia: "",
            descricao: "",
            senha: "",
            confirmacao_senha: "",
            codigo: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
          >
          {({handleSubmit, ...props})=> (
          <Form>
            <Input 
            name="nomeCurso"
            label={"Nome do curso"}
            type="text"
            />
            <Input
            name="materia"
            label={"Materia"}
            type="text"
            />    
            <Input
            name="descricao"
            label={"Descrição"}
            type="text"
            />  
            <Input
            name="codigo"
            label={"Codigo da turma"}
            type="text"
            />  
          <p className={styles.senha_h}>Habilitar senha <input id="toggle" className={styles.toggle} type="checkbox" onClick={() => setHabilitado(habilitado * -1)}></input>
          <label htmlFor="toggle"></label></p> 
          {habilitado === 1 &&(
            <div className={styles.campo_senha}> 
            <Input name="senha" label={"Inserir senha"} type="password" placeholder=""/>
            <Input name="confirmacao_senha" label={"Confirmar senha"} type="password" placeholder=""/>
            </div>
          )}
          <Button variant="outlined" onClick={handleClickOpen}>
            Criar curso
          </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
              <DialogTitle id="alert-dialog-title">
                {"Você deseja realmente adicionar um curso?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}  >Cancelar</Button>
                <Button onClick={handleSubmit}>Confirmar</Button>
              </DialogActions>
          </Dialog>
          </Form>
          )}
          </Formik>
        <div>
        </div>
        {}
      </div>
  );
}

export default CriarCurso;
