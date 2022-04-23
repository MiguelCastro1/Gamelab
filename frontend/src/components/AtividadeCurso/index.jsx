import { useNavigate } from "react-router-dom";
import { GiTeacher } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FcUpload, FcSportsMode, FcVoicePresentation } from "react-icons/fc";
import userPhoto from "../../assets/user_padrao.png";
import { AiOutlineCloudUpload } from "react-icons/ai";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import comemoracao from "../../assets/comemora.gif";
import {Form, Formik} from 'formik';
import { Button, Modal, Box, Typography,Dialog, DialogTitle, DialogActions,
  Radio ,RadioGroup, FormControlLabel , FormControl , FormLabel  } from "@mui/material";
import cool from "../../assets/cool.gif";
import awesome from "../../assets/awesome.gif";
import samurai from "../../assets/samurai.gif";
import api from "../../services/axios";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import FileDownload from "js-file-download";
import Input from "../../components/Input";
import { MdOutlineFileDownload } from "react-icons/md";
import * as Yup from "yup";

function AtividadeCurso({
  atividade,
  monstro,
  _alunos,
  courseId,
  atividadeId,
  ...props
}) {
  const { id, perfil } = localStorage.getItem("gamelab") ? JSON.parse(localStorage.getItem("gamelab")): null;
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState(
    perfil === "aluno"? 
        alunos
          .filter((aluno) => _aluno.userId._id === id)[0]
          .atividades.filter(
            (atividade) => atividade.atividadeId === atividadeId
          )[0]
     :
        _alunos.map(
          (aluno) =>
            aluno.atividades.filter(
              (atividade) => atividade.atividadeId === atividadeId
            )[0]
        )
    );
      
  const [campos, setCampos] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [file, setFile] = useState([]);
  const data = atividade.dataEntrega ? Date.parse(atividade.dataEntrega) : "";
  const status = [samurai, cool, awesome];
  const data_ati = new Date(data);
  const data_curr = new Date();
  const diffTime = data_ati >= data_curr ? Math.abs(data_ati - data_curr) : -1 * Math.abs(data_curr - data_ati);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffDays_real = diffTime / (1000 * 60 * 60 * 24);
 
  let atividade_aluno = []
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

  const fields = [
    'aluno',
    'atividadeId',
    'nota',
    'status',
    'entregaUri',
    'dataEntrega'
  ];

  const formSchema = Yup.object().shape({
    nota: Yup.string().required("Campo obrigatório"), 
  });

  const handleClickOpen = async () => {
    // data.append("dataEntrega", new Date());
    console.log(file[0]);
    try {
      if (file.length > 0) {
        let data = new FormData();
        data.append("file", file[0]);
        data.append("dataEntrega", new Date());
        data.append("_id", atividadeId);
        await api.patch(`/cursos/${courseId}/entregas/${id}`, data);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar atividade");
    }
  };

  const handleClose = () => setOpen(false);

  const handleClose2 = () => setOpen2(false);

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...file, newFile];
      setFile(updatedList);
    }
  };

  const fileRemove = () => {
    setFile([]);
  };

  const onDownloadFile = async (uri) => {
    const { data } = await api.get(`/download/${uri}`, {
      config: {
        responseType: "blob",
      },
    });
    let filename = uri.slice(9);
    FileDownload(data, filename);
  };

  const Salvar = async () => {

    try {
      await api.patch(`cursos/${courseId}`, {Alunos: alunos});
      toast.success("Notas salvas com sucesso");
      navigate(`/curso/${courseId}`);
    } catch (error) {
      console.log(error); 
      toast.error("Erro ao editar dados");
    }
  };

  
  const handleSubmit = async (values) => {
    let object ={
      ...values
    };
    delete object.aluno;
    object.status = 'avaliado';
   
    console.log({object})
    try {
      let s = [...alunos]
      s[values.aluno] = {...object}      
      setAlunos(s)
      setOpen2(false);
    
      toast.success("Campos editados com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar seus dados");
    }
  };

  const DefiniCampos = (aluno_index) => {
    setCampos({aluno_index, ...alunos[aluno_index]});
    setOpen2(true);
  }

  return (
    <div className={styles.feed}>
      <div className={styles.titulo}>
        {perfil === "aluno" && (
          <img src={monstro} alt="Monstro" width={115} height={115} />
        )}
        <h1>{atividade.titulo}</h1>
      </div>
      <div className={styles.descricao}>
        <h2>Descrição: </h2>
        <p>{atividade.descricao}</p>
      </div>
      <div className={styles.dados}>
        <div>
          <h2>Data de Entrega: </h2>
          <p>{data_ati.toLocaleDateString()}</p>
        </div>
        <div>
          <h2>Hora de Entrega: </h2>
          <p>{data_ati.toLocaleTimeString()}</p>
        </div>
        <div>
          <h2>Tempo Restante: </h2>
          <p>{diffDays} Dias</p>
        </div>
      </div>
      {perfil === "aluno" && (
        <div className={styles.dados}>
          <div>
            <h2>Status: </h2>
            <p>{alunos.status ? alunos.status : ""}</p>
          </div>
          <div>
            <h2>Nota: </h2>
            <p>
              {alunos.status && alunos.status === "aberto"
                ? "Ainda não foi entregue"
                : alunos.status === "entregue"
                ? "Ainda não foi avaliado"
                : alunos.nota}
            </p>
          </div>

          <div className={styles.anexo}>
            <AiOutlineCloudUpload />
            <p>Clique ou arraste.</p>
            <input type="file" value="" onChange={onFileDrop} />
          </div>
        </div>
      )}
      {file.length > 0 && (
        <div className={styles.infoFile}>
          <p>{file[0].name}</p>
          <div className={styles.excludeFile} onClick={fileRemove}>
            <p>x</p>
          </div>
        </div>
      )}

      {perfil === "aluno" && (
        <div className={styles.enviar}>
          <img src={status[0]} alt="Monstro" width={120} height={110} />
          <Button variant="outlined" onClick={handleClickOpen}>
            Enviar Atividade
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            className="Dialog"
          >
            <DialogTitle
              id="alert-dialog-title"
              fontSize={16}
              textAlign={"center"}
            >
              <p>Você entregou a atividade!</p>
            </DialogTitle>
            <DialogContentText
              variant="outlined"
              id="alert-dialog-description"
              textAlign={"center"}
            >
              <img
                className="imagem"
                src={comemoracao}
                alt="comemoração"
                width={115}
                height={115}
              ></img>
            </DialogContentText>

            <DialogActions>
              <Button onClick={handleClose}>Voltar</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {perfil === "professor" && (
        <div className={styles.entregas}>
          <h1> Entregas </h1>
          {alunos.map((aluno, index) => (
            <div className={styles.container}>
              <section>
                <h3>{_alunos[index].userId.nome}</h3>
              </section>
              <section>
                <p>
                  <span>Status:</span> {aluno.status}
                </p>
                <span>
                  Data:{" "}
                  {aluno.dataEntrega
                    ? new Date(
                        Date.parse(aluno.dataEntrega)
                      ).toLocaleDateString()
                    : ""}
                </span>
              </section>
              <p>
                <span>Entrega: </span> {aluno.entregaUri ?? aluno.entregaUri}
              </p>
              <p>
                <span>Nota: </span> {aluno.nota ?? aluno.nota}
              </p>
              <section>
                <Button
                  variant="outlined"
                  startIcon={<FaChalkboardTeacher size={30} />}
                  onClick = {() => DefiniCampos(index)}
                >
                  Atribuir nota
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MdOutlineFileDownload size={30} />}
                  onClick={() => onDownloadFile(aluno.entregaUri)}
                >
                  Download
               </Button>
      
              </section>
            </div>
          ))}
        </div>
      )}

        <div className={styles.modal}> 
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description" >
              <Box sx={style}>
                      
                <Formik initialValues={{
                  aluno: campos.aluno,
                  atividadeId: campos.atividadeId,
                  nota: campos.nota,
                  status: campos.status,
                  entregaUri: campos.entregaUri,
                  dataEntrega: campos.dataEntrega 
                }}
                onSubmit = {handleSubmit}
                validationSchema={formSchema}
                
                >
              
                  {({handleSubmit,values,setFieldValue, ...props}) => (
                     <Form>
                    <Input
                    name="nota"
                    label={"Nota"}
                    value={values.nota}
                    type="number"
                    min = {0}
                    max = {10}
                    />     
                 
                  <Button onClick={handleClose2}>Cancelar</Button>
                  <Button  type="submit" onClick={handleSubmit}>Confirmar</Button>
                  </Form>
                  )}
                </Formik>

              </Box>
            </Modal>
          </div>


    </div>
  );
}

export default AtividadeCurso;
