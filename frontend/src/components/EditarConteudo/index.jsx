import { useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import api from "../../services/axios";
import { toast } from "react-toastify";
import {RiDeleteBin5Line, RiAddCircleLine} from "react-icons/ri";
import { FcLink } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import {Form, Formik} from 'formik';
import Input from "../../components/Input";
import { FcFile } from "react-icons/fc";
import { FiEdit2 } from "react-icons/fi";
import { Button, Modal, Box, Typography,Dialog, DialogTitle, DialogActions} from "@mui/material";
import * as Yup from "yup";

function EditarConteudo({ Secoes, nomeCurso, courseId, ...props }) {
  const navigate = useNavigate();
  const [secoes, setSecoes] = useState(Secoes);
  const [flagReset, setFlagReset] = useState(true);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [campos, setCampos] = useState({});
  
  const fields = [
    'secao',
    'conteudo',
    'tipo',
    'titulo',
    'uri',
    'visivel',
    'descricao',
    'dataInicio',
    'dataEntrega',
  ];


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
  };

  const handleCancel = () => setFlagReset(!flagReset);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  
  const handleOpen2 = () => setOpen2(true);

  const handleClose2 = () => setOpen2(false);

  const handleSave= async () => {

    try {
    //  await api.patch(`cursos/${courseId}`, values);
      toast.error("Funcao ainda nao implementada");
      //toast.success("Campos editados com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar seus dados");
    }
  };

  const deletar = (secao, conteudo) => {
    try {
      /*
      if(values.conteudo === -1){
    
      }else{
     
      }*/
      setOpen(false);
      setOpen2(false);
    // toast.success("Campos editados com sucesso");
    toast.error("Funcao ainda nao implementada");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar seus dados");
    }
  }

  const handleSubmit = async (values) => {
    console.log(values)
    try {
      /*
      if(values.secao === secoes.length) {
        setSecoes([...secoes, {'titulo': values.titulo, 'conteudos':[]}]);
      }else if(values.conteudo === -1){

      }else if(secoes[secao].conteudos.length === conteudo){
       
      }else{
     
      }*/
      console.log(secoes)
      setOpen(false);
     // toast.success("Campos editados com sucesso");
     toast.error("Funcao ainda nao implementada");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar seus dados");
    }
  };

  const DefiniCampos = (secao, conteudo) => {
    if(secoes.length === secao){
      setCampos({secao, conteudo});
    }else if(conteudo === -1){
      setCampos({secao, conteudo, ...secoes[secao]});
    }else if(secoes[secao].conteudos.length === conteudo){
      setCampos({secao, conteudo});
    }else{
      setCampos({secao, conteudo, ...secoes[secao].conteudos[conteudo] });
    }
    setOpen(true);
  }

  const formSchema = Yup.object().shape({
    titulo: Yup.string().required("Campo obrigatório"),
    conteudo: Yup.string().required("Campo obrigatório"),
  });

  return (
    <div className={styles.container}>
      <h1>
        {" "}
        <SiGoogleclassroom size={25} /> {nomeCurso}{" "}
      </h1>
      {console.log(secoes)}
      {secoes.map((secao, sindex) => (
        <div className={styles.secao}> 
          <div className={styles.info}>
              <h2>{secao.titulo}</h2>
              <div>
                <FiEdit2 className={styles.iconEdit} onClick={() => DefiniCampos(sindex, -1)}/>
              </div>
          </div>

          <div className={styles.conteudo}>
            {secao.conteudos.map((conteudo, cindex) => (
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
                <FiEdit2 className={styles.iconEdit}  onClick={() => DefiniCampos(sindex,cindex)}/>
              </div>
              </div>
            ))}
             <Button
              onClick={() => DefiniCampos(sindex, secoes[sindex].conteudos.length)}
              variant="outlined"
              startIcon={<RiAddCircleLine />}
            >
            Adicionar Conteudo
           </Button>
          </div>
        </div>
      ))}
       <Button
        onClick={() => DefiniCampos(secoes.length, -1)}
        variant="outlined"
        startIcon={<RiAddCircleLine />}
      >
        Adicionar Seção
       </Button>

        <div> 
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description" >
              <Box sx={style}>

                <Formik initialValues={{
                  secao: campos.secao,
                  conteudo: campos.conteudo,
                  tipo: campos.tipo,
                  titulo: campos.titulo,
                  uri: campos.uri,
                  visivel: campos.visivel,
                  descricao: campos.descricao,
                  dataInicio: campos.dataInicio,
                  dataEntrega: campos.dataEntrega,
                }}
                onSubmit = {handleSubmit}
                validationSchema={formSchema}
                
                >
              
                  {({handleSubmit,values, ...props}) => (
                     <Form>
                    
                    <Input
                    name="titulo"
                    label={"Titulo"}
                    value={values.titulo}
                    type="text"
                    />

                    {values.conteudo !== -1 && (
                     <Input
                    name="tipo"
                    label={"Tipo de conteudo"}
                    value={values.tipo}
                    type="text"
                    />
                    )}
                    
                    {values.conteudo !== -1 && (
                    <Input
                    name="uri"
                    label={"Arquivo"}
                    value={values.uri}
                    type="text"
                    />
                    )}
                    {false && (
                    <Input
                    name="visivel"
                    label={"Vísivel"}
                    value={values.visivel}
                    type="text"
                    />
                    )}
                    {values.conteudo !== -1 &&  values.tipo === 'Atividade' && (
                    <Input
                    name="descricao"
                    label={"Descrição"}
                    value={values.descricao}
                    type="text"
                    />
                    )}
                    {values.conteudo !== -1 && values.tipo === 'Atividade' &&(
                    <Input
                    name="dataEntrega"
                    label={"Data de Entrega"}
                    value={values.dataEntrega}
                    type="text"
                    />
                    )}
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button  type="submit" onClick={handleSubmit}>Confirmar</Button>
                  <Button  onClick={() => setOpen2(true)}>Excluir</Button>
                  <Dialog open={open2} onClose={handleClose2} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="alert-dialog-title">
                      {"Você deseja realmente Excluir?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose2}  >Cancelar</Button>
                      <Button onClick={() => deletar(values.secao, values.conteudo)}>Confirmar</Button>
                    </DialogActions>
                  </Dialog>
                  </Form>
                  )}
                </Formik>

              </Box>
            </Modal>
          </div>
          <div>
         
          <div className={styles.foot}>
          <button
            style={{ opacity: "1" }}
            className={styles.salvar}
            onclick={() => handleSave}
          >
            Salvar
          </button>
          <button
            style={{ opacity: "1" }}
            className={styles.cancelar}
            onClick={() => handleCancel}
          >
            Cancelar
          </button> 
        </div>
        </div>
    </div>
  );
}

export default EditarConteudo;
