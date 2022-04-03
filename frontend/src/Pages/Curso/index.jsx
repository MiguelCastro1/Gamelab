import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import Secoes from "../../components/Secoes";
import Participantes from "../../components/Participantes";
import Atividade from "../../components/Atividade";
import Notas from "../../components/Notas";
import EditarDados from "../../components/EditarDados";
import EditarConteudo from "../../components/EditarConteudo";
import CriarAviso from "../../components/CriarAviso";
import {getToken} from "../../services/auth";
import monster from "../../assets/guerreiro-morto.gif";
import ghost from "../../assets/ghost.gif";
import {AiFillPlusSquare} from "react-icons/ai";
import { BsKanban} from "react-icons/bs";
import {SiGoogleclassroom} from "react-icons/si";
import {FcHome, FcAreaChart, FcConferenceCall, FcDislike, FcApproval, FcSupport, FcEditImage, FcAdvertising, FcLeft } from "react-icons/fc";
import {toast} from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ShowMoreText from "react-show-more-text";


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

  const [curso, setCurso] = useState({});
  const [pagina, setPagina] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const {courseId} = useParams();
  let {id, perfil } = getToken() ? JSON.parse(getToken()) : null;
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
        setLoaded(true);
        setPagina('home');
        console.log('done')
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
              <h1>  <SiGoogleclassroom size={25}/> {loaded ? curso.nomeCurso : ''}  </h1> 
              {pagina === 'home' && <Secoes secoes={secoes} />}
              {pagina === 'participantes' && loaded && <Participantes Alunos={curso.Alunos}/>}
              {pagina === 'notas' && <Notas Alunos={curso.Alunos} />}
              {pagina === 'atividade' && <Atividade atividade={atividades[0]} />}
              {pagina === 'editar-dados' && <EditarDados curso={curso} />}
              {pagina === 'editar-conteudo' && <EditarConteudo curso={curso} />}
              {pagina === 'criar-aviso' && <CriarAviso courseId={courseId} />}
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
                <p><span className={styles.tit}> Status: </span> {loaded ? 'Ativo' : ''} < FcApproval size={20}/> </p> 
              </div> 

              {perfil === 'aluno' && (
                <div className={styles.botoes} >
                  {pagina === 'participantes' ? (
                     <Button onClick={() => setPagina('home')}  variant="outlined" startIcon={<FcLeft />}>
                     Voltar para curso
                     </Button>
                   
                  ) : (
                    <Button onClick={() => setPagina('participantes')}  variant="outlined" startIcon={<FcConferenceCall />}>
                    Ver Partipantes
                    </Button>
                  )}
                  
                  {pagina === 'notas' ? (
                    <Button onClick={() => setPagina('home')}  variant="outlined" startIcon={<FcLeft />}>
                    Voltar para curso
                    </Button>
                  ) : (
                    <Button  onClick={() => setPagina('notas')} variant="outlined" startIcon={<FcAreaChart /> }>
                    Ver Notas
                    </Button>
                  )}

                  <Button  onClick={() => handleClickOpen()} variant="outlined" startIcon={<FcDislike /> }>
                  Desinscrever-se  
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

                  {pagina === 'atividade' && (
                    <Button onClick={() => setPagina('home')}  variant="outlined" startIcon={<FcLeft />}>
                    Voltar para curso
                    </Button>
                  )}
                </div>
                )}

              {perfil === 'professor' && (
                <div className={styles.botoes} >
                   {pagina === 'editar-dados' ? (
                     <Button onClick={() => setPagina('home')}  variant="outlined" startIcon={<FcLeft />}>
                     Voltar para curso
                     </Button>
                   
                  ) : (
                    <Button onClick={() => setPagina('editar-dados')}  variant="outlined" startIcon={<FcSupport />}>
                    Editar dados
                    </Button>
                  )}
                  
                  {pagina === 'editar-conteudo' ? (
                    <Button onClick={() => setPagina('home')}  variant="outlined" startIcon={<FcLeft />}>
                    Voltar para curso
                    </Button>
                  ) : (
                    <Button  onClick={() => setPagina('editar-conteudo')} variant="outlined" startIcon={<FcEditImage /> }>
                    Adicionar/Editar Conteudo
                    </Button>
                  )}

                  {pagina === 'participantes' ? (
                     <Button onClick={() => setPagina('home')}  variant="outlined" startIcon={<FcLeft />}>
                     Voltar para curso
                     </Button>
                   
                  ) : (
                    <Button onClick={() => setPagina('participantes')}  variant="outlined" startIcon={<FcConferenceCall />}>
                    Ver Partipantes
                    </Button>
                  )}
                  
                  {pagina === 'notas' ? (
                    <Button onClick={() => setPagina('home')}  variant="outlined" startIcon={<FcLeft />}>
                    Voltar para curso
                    </Button>
                  ) : (
                    <Button  onClick={() => setPagina('notas')} variant="outlined" startIcon={<FcAreaChart /> }>
                    Ver Notas
                    </Button>
                  )}

                  {pagina === 'criar-aviso' ? (
                    <Button onClick={() => setPagina('home')}  variant="outlined" startIcon={<FcLeft />}>
                    Voltar para curso
                    </Button>
                  ) : (
                    <Button  onClick={() => setPagina('criar-aviso')} variant="outlined" startIcon={<FcAdvertising /> }>
                     Criar Avisos
                    </Button>
                  )}

                  <Button  onClick={() => handleClickOpen()} variant="outlined" startIcon={<FcDislike /> }>
                  Excluir Curso 
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

                  {pagina === 'atividade' && (
                    <Button onClick={() => setPagina('home')}  variant="outlined" startIcon={<FcLeft />}>
                    Voltar para curso
                    </Button>
                  )}
                </div>
              )}
      
              <div className={styles.atividades} >
                <h3> Atividades </h3>
                {atividades.map((atividade) => (
                  <div key = {atividade.titulo} className={styles.tarefa}>
                  <p style={{fontWeight: 'bolder'}}> {atividade.titulo} </p>
                    <p> Entrega : {atividade.dataFim}  </p> 
                    <Button onClick={() => setPagina('atividade')}  variant="outlined" startIcon={<AiFillPlusSquare />} >
                     Mais Detalhes
                     </Button>
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
