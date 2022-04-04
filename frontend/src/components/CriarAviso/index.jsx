import { Link } from "react-router-dom";
import userPhoto from "../../assets/user_padrao.png"
import styles from "./styles.module.scss";
import api from "../../services/axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import Input from "../../components/Input";
import { getToken } from "../../services/auth";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


function CriarAviso({courseId, ...props}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const formSchema = Yup.object().shape({
    titulo: Yup.string().required("Campo obrigatório"),
    conteudo: Yup.string().required("Campo obrigatório"),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values, actions) => {
      let object = {
        ...values,
        courseId: courseId
      };
      console.log(object);
    
      try {
        await api.post("/avisos", object);
        console.log('done')
        toast.success("Aviso criado com Sucesso")
        window.location.reload();
      } catch (error) {
        toast.error("Algum erro ocorreu")
        console.log(error);
      }
    };
  return (

      <div className={styles.feed}>
        <h1>Criar Aviso</h1>
        <Formik initialValues={{
          conteudo:"",
          titulo:"",
        }}
        onSubmit = {handleSubmit}
        validationSchema={formSchema}
        >
        {({handleSubmit, ...props}) => (
          <Form>
            <Input
            name="titulo"
            label={"Titulo do aviso"}
            type="text"
            />
            <Input
            name="conteudo"
            label={"Conteudo"}
            type="text"
            />
            <Button variant="outlined" onClick={handleClickOpen}>
              Criar aviso
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
              <DialogTitle id="alert-dialog-title">
                {"Você deseja realmente criar um aviso?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}  >Cancelar</Button>
                <Button onClick={handleSubmit}>Confirmar</Button>
              </DialogActions>
            </Dialog>
          </Form>
        )}
        </Formik>
      </div>      
  );
}

export default CriarAviso;
