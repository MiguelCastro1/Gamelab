import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsKanban} from "react-icons/bs";
import HeaderHome from "../../components/HeaderHome";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import Input from "../../components/Input";
import { getToken } from "../../services/auth";
import Secoes from "../../components/Secoes";
import monster from "../../assets/guerreiro-morto.gif";
import ghost from "../../assets/ghost.gif";
import {SiGoogleclassroom} from "react-icons/si";
import {FcHome} from "react-icons/fc";
import {FcAreaChart, FcConferenceCall, FcDislike, FcApproval,
   FcSupport, FcEditImage, FcAdvertising } from "react-icons/fc";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ShowMoreText from "react-show-more-text";
import { ClassNames } from "@emotion/react";
import { style } from "@mui/system";

function Curso() {
  const atividades = [
    {
      titulo: "Matematica Lógica",
      dataFim: "15/04/22 as 21:00",
      imagem: monster,
    },
    {
      titulo: "Programação Lógica",
      dataFim: "15/04/22 as 21:00",
      imagem: ghost,
    }
  ]
  const secoes = [
    {
      titulo: 'Plano de Ensino',
      conteudos: [
        {
          tipo : 'pdf',
          titulo: 'Plano de Ensino 2022',
          visivel: true
        }
      ]
    },
    {
      titulo: 'Modulo 1: Vetores',
      conteudos: [
        {
          tipo : 'pdf',
          titulo: 'Aula 01 - Introdução a vetores',
          visivel: true
        },
        {
          tipo : 'link',
          titulo: 'Playlist de Vetores',
          visivel: true
        },
        {
          tipo : 'Atividade',
          titulo: 'Atividade 01 - Vetores',
          visivel: true
        },
      ]
    },
    {
      titulo: 'Modulo 2: Matrizes',
      conteudos: []
    }
  ]

  let { id, perfil } = getToken() ? JSON.parse(getToken()) : null;
  const [curso, setCurso] = useState({});
  const [loaded, setLoaded] = useState(false);
  const {courseId } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const unroll =  () =>{
    try {
      api.post(`/cursos/${courseId}/desmatricula`)
      .then((data) => {
        toast("Desmatriculado com sucesso!");
        console.log('done');
        navigate('/');
      })
      .catch((err) =>  {
        toast.error("Algum Erro ocorreu") 
        console.log(err)
      })
    }catch (error) {
      toast.error("Algum Erro ocorreu") 
        console.log(err)
    }
  }

  const deletar =  () =>{
    try {
      api.delete(`/cursos/${courseId}`)
      .then((data) => {
        toast("O curso foi excluido com sucesso!");
        console.log('done');
        navigate('/');
      })
      .catch((err) =>  {
        toast.error("Algum Erro ocorreu") 
        console.log(err)
      })
    }catch (error) {
      toast.error("Algum Erro ocorreu") 
        console.log(err)
    }
  }
  
  useEffect(() => {
    try {
      api.get(`/cursos/${courseId}`)
      .then((data) => {
        console.log(data.data.doc)
        setCurso(data.data.doc);
        console.log('done')
        setLoaded(true);
       })
      .catch(err => console.log(err))
    }catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sideBarLeft}>
            <ul>
              <li></li>
              <li>
                <Link to="/kanban" >
                  {" "}
                  Meu Kanban  {"       "} 
                  <BsKanban size={20} />
                </Link>
              </li>
              <li>
                <Link to="/">
                  {" "}
                  Home {"           "}
                  <FcHome size={20} />
                </Link>
              </li>
            </ul>
          </div>

            <div className={styles.feed}>
              
            </div>
          
            <div className={styles.sideBarRight}>
            <div className={styles.formating} >
              <div className={styles.dados}> 
                <h3> Dados da turma </h3>
                <p><span className={styles.tit}> Professor: </span> {loaded ? curso.autorId.nome : ''} </p>
                <p><span className={styles.tit}> Descrição: </span> 
                  <ShowMoreText
                    lines={2}
                    more="Ver mais"
                    less="Ver menos"
                    className="content-css"
                    width={320}
                  >
                  
                  {loaded ? curso.descricao : '' } 
                  </ShowMoreText>
                </p> 
                <p><span className={styles.tit}> Status: </span> {curso.Ativo ? 'Ativo': 'Ativo'} < FcApproval size={20}/> </p> 
              </div> 

              <div className={styles.botoes} >
                {perfil === 'aluno' && (
                  <ul>
                    <li></li>
                    <li>
                      <Link to={`/participantes/${courseId}`}>
                        {" "}
                        <FcConferenceCall size={20} /> Ver Participantes {" "}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/notas-curso/${courseId}`}>
                        {" "}
                        <FcAreaChart size={20} />
                        Ver Notas
                        {" "}
                      </Link>
                    </li>
                    <li>
                      <Button  className={styles.botao} onClick={handleClickOpen}>
                      <FcDislike size={20} /> Desinscrever-se  
                      </Button>
                      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                        <DialogTitle id="alert-dialog-title">
                          {"Você deseja realmente se desmatricular?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleClose}  >Cancelar</Button>
                          <Button onClick={unroll}>Confirmar</Button>
                        </DialogActions>
                      </Dialog>    
                    </li>
                  </ul>
                )}

                {perfil === 'professor' && (
                  <ul>
                    <li></li>
                    <li>
                      <Link to={`/cursos/${courseId}`}>
                        {" "}
                        <FcSupport size={20} /> Voltar{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/participantes/${courseId}`}>
                        {" "}
                        <FcEditImage size={20} /> Adicionar/Editar Conteudo{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/participantes/${courseId}`}>
                        {" "}
                        <FcConferenceCall size={20} /> Ver Participantes {" "}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/notas-curso/${courseId}`}>
                        {" "}
                        <FcAreaChart size={20} />
                        Ver Notas
                        {" "}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/participantes/${courseId}`}>
                        {" "}
                        <FcAdvertising size={20} /> Criar Avisos {" "}
                      </Link>
                    </li>
                    <li>
                      <Button  className={styles.botao} onClick={handleClickOpen}>
                      <FcDislike size={20} /> Desinscrever-se  
                      </Button>
                      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                        <DialogTitle id="alert-dialog-title">
                          {"Você deseja realmente se desmatricular?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleClose}  >Cancelar</Button>
                          <Button onClick={deletar}>Confirmar</Button>
                        </DialogActions>
                      </Dialog>    
                    </li>
                  </ul>
                )}
              </div>

              <div className={styles.atividades} >
                <h3> Atividades </h3>
                {atividades.map((atividade) => (
                  <div key = {atividade.titulo} className={styles.tarefa}>
                  <p style={{fontWeight: 'bolder'}}> {atividade.titulo} </p>
                    <p> Entrega : {atividade.dataFim}  </p> 
                    <Link className={styles.moreDetails} to={`/curso/${courseId}/${atividade.titulo}`}>Mais Detalhes</Link>
                    {perfil === 'aluno' && 
                      <img
                        src={atividade.imagem}  
                        alt="Monstro"  
                        width={115}
                        height={115}
                      />
                  }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Curso;
