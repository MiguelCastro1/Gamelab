import { useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import api from "../../services/axios";
import { toast } from "react-toastify";
import {RiDeleteBin5Line, RiAddCircleLine} from "react-icons/ri";
import { FcLink } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import {Form} from 'formik';
import Input from "../../components/Input";
import { FcFile } from "react-icons/fc";
import { FiEdit2 } from "react-icons/fi";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
function EditarConteudo({ Secoes, nomeCurso, courseId, ...props }) {
  const navigate = useNavigate();
  const [secoes, setSecoes] = useState(Secoes);
  const [flagReset, setFlagReset] = useState(true);
  const [open, setOpen] = useState(false);

  const acao = (conteudo) => {
    if (conteudo.tipo === "pdf") {  
      window.open(conteudo.uri);
    } else if (conteudo.tipo === "link") {
      window.open(conteudo.uri);
    } else {
      console.log("inin");
      navigate(`/curso/${courseId}/${conteudo._id}  `);
    }
  };

  const handleCancel = () => {
    setFlagReset(!flagReset);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1>
        {" "}
        <SiGoogleclassroom size={25} /> {nomeCurso}{" "}
      </h1>
      {secoes.map((secao, index) => (
        <div className={styles.secao}> 
          <div className={styles.info}>
              <h2>{secao.titulo}</h2>
              <div>
                <FiEdit2 className={styles.iconEdit} onClick={() => setOpen(true)}/>
                <RiDeleteBin5Line className={styles.iconEdit} onClick={() => setOpen(true)}/>
              </div>
          </div>

          <div className={styles.conteudo}>
            {secao.conteudos.map((conteudo) => (
              <div
                className={styles.conteudoInfo}>
                {conteudo.tipo == "pdf" ? (
                  <FcFile size={25} />
                ) : conteudo.tipo == "link" ? (
                  <FcLink size={25} />
                ) : (
                  <FcInspection size={25} />
                )}
                <h3>{conteudo.titulo}</h3>
                
               <div>
                <FiEdit2 className={styles.iconEdit}  onClick={() => setOpen(true)}/>
                <RiDeleteBin5Line className={styles.iconEdit}  onClick={() => setOpen(true)}/>
              </div>
              </div>
            ))}
             <Button
              onClick={() => setOpen(true)}
              variant="outlined"
              startIcon={<RiAddCircleLine />}
            >
            Adicionar Conteudo
           </Button>
          </div>
        </div>
      ))}
       <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        startIcon={<RiAddCircleLine />}
      >
        Adicionar Seção
       </Button>
       <div className={styles.foot}>
          <button
            style={{ opacity: "1" }}
            className={styles.salvar}
            type="submit"
          >
            Salvar
          </button>
          <button
            style={{ opacity: "1" }}
            className={styles.cancelar}
            onClick={handleCancel}
            type="button"
          >
            Cancelar
          </button> 

          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            {"Editar Conteudo"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleClose}>Criar</Button>
          </DialogActions>
        </Dialog>
        </div>
    </div>
  );
}

export default EditarConteudo;
