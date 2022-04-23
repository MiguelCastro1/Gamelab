import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import {BiTrash} from "react-icons/bi";
import api from "../../services/axios";
import { toast } from "react-toastify";
import {RiDeleteBin5Line, RiAddCircleLine} from "react-icons/ri";
import { FcLink } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import {Form, Formik} from 'formik';
import Input from "../../components/Input";
import { FcFile } from "react-icons/fc";
import { FiEdit2 } from "react-icons/fi";
import { Button, Modal, Box, Typography,Dialog, DialogTitle, DialogActions,
        Radio ,RadioGroup, FormControlLabel , FormControl , FormLabel  } from "@mui/material";
import * as Yup from "yup";

function EditarConteudoCurso({_secoes, nomeCurso, courseId, ...props }) {
  const navigate = useNavigate();
  const [secoes, setSecoes] = useState(_secoes);
  const [campos, setCampos] = useState({});
  const [reload, setReload] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

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
    border: '2px solid grey',
    boxShadow: 24,
    p: 5,
  };

  const Cancelar = () =>  navigate(`/curso/${courseId}`);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  
  const handleOpen2 = () => setOpen2(true);

  const handleClose2 = () => setOpen2(false);

  const Salvar = async () => {

    try {
      await api.patch(`cursos/${courseId}`, {secoes: secoes});
      toast.success("Campos editados salvos com sucesso");
      navigate(`/curso/${courseId}`);
    } catch (error) {
      console.log(error); 
      toast.error("Erro ao editar seus dados");
    }
  };

  const deletar = (secao, conteudo) => {
    try {
      //excuir  secao
      if(conteudo === -1){
        console.log('1')
        let s = [...secoes]
        s.splice(secao, 1);
        console.log({s})
        setSecoes(s)
      //editar conteudo
      }else {
        console.log('2')
        let s = [...secoes]
        s[secao].conteudos.splice(conteudo, 1);  
        setSecoes(s)
      }

     setOpen2(false);
     setOpen(false);
     toast.success("Campos editados com sucesso");
     //toast.error("Funcao ainda nao implementada");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar seus dados");
    }
  }

  const handleSubmit = async (values) => {
    let object ={
      ...values
    };

    delete object.secao;
    delete object.conteudo;
    console.log({object})
    try {
      //adicionar nova secao
      if(values.secao === secoes.length) {
        console.log('1')
        setSecoes([...secoes, {'titulo': values.titulo, 'conteudos':[]}]);
      //editar titulo da secao
      }else if(values.conteudo === -1){
        console.log('2')
        let s = [...secoes]
        s[values.secao].titulo = values.titulo
        setSecoes(s)

      //editar conteudo
      }else if(secoes[values.secao].conteudos.length > values.conteudo){
        console.log('3')
        let s = [...secoes]
        let _id = s[values.secao].conteudos[values.conteudo]._id
        s[values.secao].conteudos[values.conteudo] = {...object, _id}      
        setSecoes(s)
      //adicionar novo conteudo
      }else{
        console.log('4')
        let s = [...secoes]
        s[values.secao].conteudos = [...s[values.secao].conteudos, object] 
        setSecoes(s)
      }

     setOpen(false);
     toast.success("Campos editados com sucesso");
     //toast.error("Funcao ainda nao implementada");
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
                {conteudo.tipo == "arquivo" ? (
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
       
    <div className={styles.foot}>
      <Button
        className={styles.salvar}
        onClick={Salvar}
      >
        Salvar
      </Button>
      <Button
        className={styles.cancelar}
        onClick={Cancelar}
      >
        Cancelar
      </Button> 
  
    </div>


    <div className={styles.modal}> 
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description" >
              <Box sx={style}>

                <Formik initialValues={{
                  secao: campos.secao,
                  conteudo: campos.conteudo,
                  tipo: campos.tipo !== undefined ? campos.tipo : "link",
                  titulo: campos.titulo !== undefined ? campos.titulo : "",
                  uri: campos.uri !== undefined ? campos.uri : "",
                  visivel: campos.visivel !== undefined ? campos.visivel : true,
                  descricao: campos.descricao !== undefined ? campos.descricao : "",
                  dataInicio: campos.dataInicio !== undefined ? campos.dataInicio : "",
                  dataEntrega: campos.dataEntrega !== undefined ? campos.dataEntrega : "",
                }}
                onSubmit = {handleSubmit}
                validationSchema={formSchema}
                
                >
              
                  {({handleSubmit,values,setFieldValue, ...props}) => (
                     <Form>
                    {console.log({values})}
                    {values.conteudo !== -1 && (
                   
                      <FormControl  value={styles.tipo}>
                        <FormLabel id="demo-radio-buttons-group-label">Tipo</FormLabel>
                        <RadioGroup
                        row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel control={<Radio onChange={() => setFieldValue(values.tipo = 'link')} checked={values.tipo === 'link' ? true: false}/>} label="Link" />
                          <FormControlLabel control={<Radio onChange={() => setFieldValue(values.tipo = 'arquivo')} checked={values.tipo === 'arquivo' ? true: false}/>} label="Arquivo" />
                          <FormControlLabel control={<Radio onChange={() => setFieldValue(values.tipo = 'Atividade')} checked={values.tipo === 'Atividade' ? true: false}/>} label="Atividade" />
                        </RadioGroup>
                      </FormControl>
                     
                    )}

                    <Input
                    name="titulo"
                    label={"Titulo"}
                    value={values.titulo}
                    type="text"
                    estilo={{ marginTop: "2.7rem" }}
                    />     
                                   
                    {values.conteudo !== -1 &&  values.tipo !== 'Atividade' && (
                    <Input
                    name="uri"
                    label={"Arquivo"}
                    value={values.uri}
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
                    type="datetime-local"
                    />
                    )}

                    { values.conteudo !== -1 && (
                      <Input
                      name="visivel"
                      label={"Vísivel"}
                      value={values.visivel}
                      type="text"
                      />
                      )}

                      
                 
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button  type="submit" onClick={handleSubmit}>Confirmar</Button>
                  <Button style={{color:'#ef856b', marginLeft:'12px'}} onClick={() => setOpen2(true)} startIcon={<BiTrash size={20}/>}>
                    Excluir
                  </Button>
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
    </div>
  );
}

export default EditarConteudoCurso;
