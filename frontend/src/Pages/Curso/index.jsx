import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import Secoes from "../../components/Secoes";
import Participantes from "../../components/Participantes";
import Notas from "../../components/Notas";
import EditarDados from "../../components/EditarDados";
import EditarConteudo from "../../components/EditarConteudo";
import CriarAviso from "../../components/CriarAviso";
import { getToken } from "../../services/auth";
import monster from "../../assets/guerreiro-morto.gif";
import ghost from "../../assets/ghost.gif";
import { AiFillPlusSquare } from "react-icons/ai";
import { BsKanban } from "react-icons/bs";
import { VscBellDot } from "react-icons/vsc";
import {
  FcHome,
  FcAreaChart,
  FcConferenceCall,
  FcDislike,
  FcApproval,
  FcSupport,
  FcEditImage,
  FcAdvertising,
  FcLeft,
} from "react-icons/fc";
import { toast } from "react-toastify";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import ShowMoreText from "react-show-more-text";
import orc_gordo from "../../assets/orc_gordo.gif";

function Curso() {
  const monstros = [monster, ghost, orc_gordo];
  const atividades = [
    {
      id: "1",
      titulo: "Atividade 01 - Vetores",
      descricao:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt maxime ullam ipsum architecto repudiandae laborum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt maxime ullam ipsum architecto repudiandae laborum",
      imagem: 0,
      dataEntrega: "05/04/2022 as 23 horas",
    },
    {
      id: "2",
      titulo: "Atividade 02 - Vetores",
      descricao:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt maxime ullam ipsum architecto repudiandae laborum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt maxime ullam ipsum architecto repudiandae laborum ",
      dataEntrega: "05/04/2022 as 23 horas",
      imagem: 2,
    },
  ];

  const secoes = [
    {
      titulo: "Plano de Ensino",
      conteudos: [
        {
          tipo: "pdf",
          titulo: "Plano de Ensino 2022",
          visivel: true,
        },
      ],
    },
    {
      titulo: "Modulo 1: Vetores",
      conteudos: [
        {
          tipo: "pdf",
          titulo: "Aula 01 - Introdução a vetores",
          visivel: true,
        },
        {
          tipo: "link",
          titulo: "Playlist de Vetores",
          visivel: true,
        },
        {
          tipo: "Atividade",
          titulo: "Atividade 01 - Vetores",
          visivel: true,
        },
      ],
    },
    {
      titulo: "Modulo 2: Matrizes",
      conteudos: [],
    },
  ];

  const [curso, setCurso] = useState({});
  const [pagina, setPagina] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const { courseId } = useParams();
  let { id, perfil } = getToken() ? JSON.parse(getToken()) : null;
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const unroll = () => {
    try {
      api
        .post(`/cursos/${courseId}/desmatricula`)
        .then((data) => {
          toast("Desmatriculado com sucesso!");
          console.log("done");
          navigate("/home");
        })
        .catch((err) => {
          toast.error("Algum Erro ocorreu");
          console.log(err);
        });
    } catch (error) {
      toast.error("Algum Erro ocorreu");
      console.log(err);
    }
  };

  const deletar = () => {
    try {
      api
        .delete(`/cursos/${courseId}`)
        .then((data) => {
          toast("O curso foi excluido com sucesso!");
          console.log("done");
          navigate("/home");
        })
        .catch((err) => {
          toast.error("Algum Erro ocorreu");
          console.log(err);
        });
    } catch (error) {
      toast.error("Algum Erro ocorreu");
      console.log(err);
    }
  };

  const handleEdit = () => {};

  useEffect(() => {
    try {
      api
        .get(`/cursos/${courseId}`)
        .then((data) => {
          console.log(data.data.doc);
          setCurso(data.data.doc);
          setLoaded(true);
          setPagina("home");
          console.log("done");
        })
        .catch((err) => console.log(err));
    } catch (error) {
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
              <Button
                onClick={() => navigate("/home")}
                variant="outlined"
                startIcon={<FcHome />}
              >
                Home
              </Button>
              <Button
                onClick={() => navigate("/kanban")}
                variant="outlined"
                startIcon={<BsKanban />}
              >
                Meu Kanban
              </Button>
              {perfil === "aluno" && (
                <Button
                  onClick={() => navigate("/avisos")}
                  variant="outlined"
                  startIcon={<VscBellDot />}
                >
                  Avisos
                </Button>
              )}
            </ul>
          </div>

          <div className={styles.feed}>
            {loaded && pagina === "home" && (
              <Secoes
                secoes={curso.secoes}
                nomeCurso={curso.nomeCurso}
                courseId={courseId}
              />
            )}
            {loaded && pagina === "participantes" && loaded && (
              <Participantes Alunos={curso.Alunos} />
            )}
            {loaded && pagina === "notas" && <Notas Alunos={curso.Alunos} />}
            {loaded && pagina === "editar-dados" && (
              <EditarDados curso={courseId} />
            )}
            {loaded && pagina === "editar-conteudo" && (
              <EditarConteudo curso={curso} />
            )}
            {loaded && pagina === "criar-aviso" && (
              <CriarAviso courseId={courseId} Alunos={curso.Alunos} />
            )}
          </div>

          <div className={styles.sideBarRight}>
            <div className={styles.formating}>
              <div className={styles.dados}>
                <h3> Dados da turma </h3>
                <p>
                  <span className={styles.tit}> Professor: </span>{" "}
                  {loaded ? curso.autorId.nome : ""}{" "}
                </p>
                <p>
                  <span className={styles.tit}> Descrição: </span>
                  <ShowMoreText
                    lines={2}
                    more="Ver mais"
                    less="Ver menos"
                    className="content-css"
                    width={350}
                  >
                    {loaded ? curso.descricao : ""}
                  </ShowMoreText>
                </p>
                <p>
                  <span className={styles.tit}> Status: </span>{" "}
                  {loaded ? "Ativo" : ""} <FcApproval size={20} />{" "}
                </p>
              </div>

              {perfil === "aluno" && (
                <div className={styles.botoes}>
                  {pagina === "participantes" ? (
                    <Button
                      onClick={() => setPagina("home")}
                      variant="outlined"
                      startIcon={<FcLeft />}
                    >
                      Voltar para curso
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setPagina("participantes")}
                      variant="outlined"
                      startIcon={<FcConferenceCall />}
                    >
                      Ver Partipantes
                    </Button>
                  )}

                  {pagina === "notas" ? (
                    <Button
                      onClick={() => setPagina("home")}
                      variant="outlined"
                      startIcon={<FcLeft />}
                    >
                      Voltar para curso
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setPagina("notas")}
                      variant="outlined"
                      startIcon={<FcAreaChart />}
                    >
                      Ver Notas
                    </Button>
                  )}

                  <Button
                    onClick={() => handleClickOpen()}
                    variant="outlined"
                    startIcon={<FcDislike />}
                  >
                    Desinscrever-se
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Você deseja realmente se desmatricular?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={unroll}>Confirmar</Button>
                    </DialogActions>
                  </Dialog>

                  {pagina === "atividade" && (
                    <Button
                      onClick={() => setPagina("home")}
                      variant="outlined"
                      startIcon={<FcLeft />}
                    >
                      Voltar para curso
                    </Button>
                  )}
                </div>
              )}

              {perfil === "professor" && (
                <div className={styles.botoes}>
                  {pagina === "editar-dados" ? (
                    <Button
                      onClick={() => setPagina("home")}
                      variant="outlined"
                      startIcon={<FcLeft />}
                    >
                      Voltar para curso
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setPagina("editar-dados")}
                      variant="outlined"
                      startIcon={<FcSupport />}
                    >
                      Editar dados
                    </Button>
                  )}

                  {pagina === "editar-conteudo" ? (
                    <Button
                      onClick={() => setPagina("home")}
                      variant="outlined"
                      startIcon={<FcLeft />}
                    >
                      Voltar para curso
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setPagina("editar-conteudo")}
                      variant="outlined"
                      startIcon={<FcEditImage />}
                    >
                      Adicionar/Editar Conteudo
                    </Button>
                  )}

                  {pagina === "participantes" ? (
                    <Button
                      onClick={() => setPagina("home")}
                      variant="outlined"
                      startIcon={<FcLeft />}
                    >
                      Voltar para curso
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setPagina("participantes")}
                      variant="outlined"
                      startIcon={<FcConferenceCall />}
                    >
                      Ver Partipantes
                    </Button>
                  )}

                  {pagina === "notas" ? (
                    <Button
                      onClick={() => setPagina("home")}
                      variant="outlined"
                      startIcon={<FcLeft />}
                    >
                      Voltar para curso
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setPagina("notas")}
                      variant="outlined"
                      startIcon={<FcAreaChart />}
                    >
                      Ver Notas
                    </Button>
                  )}

                  {pagina === "criar-aviso" ? (
                    <Button
                      onClick={() => setPagina("home")}
                      variant="outlined"
                      startIcon={<FcLeft />}
                    >
                      Voltar para curso
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setPagina("criar-aviso")}
                      variant="outlined"
                      startIcon={<FcAdvertising />}
                    >
                      Criar Avisos
                    </Button>
                  )}

                  <Button
                    onClick={() => handleClickOpen()}
                    variant="outlined"
                    startIcon={<FcDislike />}
                  >
                    Excluir Curso
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Você deseja realmente se desmatricular?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={deletar}>Confirmar</Button>
                    </DialogActions>
                  </Dialog>

                  {pagina === "atividade" && (
                    <Button
                      onClick={() => setPagina("home")}
                      variant="outlined"
                      startIcon={<FcLeft />}
                    >
                      Voltar para curso
                    </Button>
                  )}
                </div>
              )}

              <div className={styles.atividades}>
                <h3> Atividades </h3>
                {atividades.map((atividade) => (
                  <div key={atividade.titulo} className={styles.tarefa}>
                    <p style={{ fontWeight: "bolder" }}> {atividade.titulo} </p>
                    <p> Entrega : {atividade.dataEntrega} </p>
                    <Button
                      onClick={() =>
                        navigate(`/curso/${courseId}/${atividade.id}`)
                      }
                      variant="outlined"
                      startIcon={<AiFillPlusSquare />}
                    >
                      Mais Detalhes
                    </Button>
                    {perfil === "aluno" && (
                      <img
                        src={monstros[atividade.imagem]}
                        alt="Monstro"
                        width={115}
                        height={115}
                      />
                    )}
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
