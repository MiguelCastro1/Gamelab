import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import Secoes from "../../components/Secoes";
import Participantes from "../../components/Participantes";
import Notas from "../../components/Notas";
import EditarDados from "../../components/EditarDados";
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
  const [curso, setCurso] = useState({});
  const [pagina, setPagina] = useState("");
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [atividades, setAtividades] = useState([]);
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

  useEffect( () => {
    const f = () => {
      try {

        api
          .get(`/cursos/${courseId}`)
          .then((data) => {
            console.log(data.data.doc)
            setCurso(data.data.doc);
            setPagina("home");
            setLoaded(true);
            console.log("done");
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, []);

  useEffect(() => {
    console.log("efect");
    const f = () => {
      if (Object.keys(curso).length > 0 && curso.secoes.length > 0) {
        console.log({ curso });
        setAtividades(
          [].concat.apply(
            [],
            curso.secoes
              .map((secao) =>
                secao.conteudos.filter(
                  (conteudo) => conteudo.tipo === "Atividade"
                )
              )
              .filter((atividade) => atividade.length > 0)
          )
        );
      }
    };
    f();
  }, [curso]);

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
              {false && (
                <Button
                  onClick={() => navigate("/kanban")}
                  variant="outlined"
                  startIcon={<BsKanban />}
                >
                  Meu Kanban
                </Button>
              )}
              {false && perfil === "aluno" && (
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
          {console.log(pagina)}
          {console.log({ ...curso })}
          <div className={styles.feed}>
            {pagina === "home" && (
              <Secoes
                secoes={[...curso.secoes]}
                nomeCurso={curso.nomeCurso}
                courseId={courseId}
              />
            )}
            {pagina === "participantes" && (
              <Participantes Alunos={curso.Alunos} />
            )}
            {pagina === "notas" && <Notas Alunos={curso.Alunos} />}

            {pagina === "editar-dados" && <EditarDados courseId={courseId} />}
            {pagina === "criar-aviso" && (
              <CriarAviso courseId={courseId} Alunos={curso.Alunos} />
            )}
          </div>

          <div className={styles.sideBarRight}>
            <div className={styles.formating}>
              <div className={styles.dados}>
                <h3> Dados da turma </h3>
                <p>
                  <span className={styles.tit}> Professor: </span>{" "}
                  {loaded && curso.autorId.nome}{" "}
                </p>
                <p>
                  <span className={styles.tit}> Descrição: </span>
                  <ShowMoreText
                    lines={2}
                    more="Ver mais"
                    less="Ver menos"
                    className="content-css"
                    width={400}
                  >
                    {curso.descricao}
                  </ShowMoreText>
                </p>
                <p>
                  <span className={styles.tit}> Status: </span> {"Ativo"}{" "}
                  <FcApproval size={20} />{" "}
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
                      onClick={() =>
                        navigate(`/curso/${courseId}/editar-conteudo`)
                      }
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
                      {"Você deseja realmente excluir o curso?"}
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
                    <p>
                      {" "}
                      Entrega :{" "}
                      {new Date(
                        Date.parse(atividade.dataEntrega)
                      ).toLocaleDateString()}{" "}
                    </p>
                    <Button
                      onClick={() =>
                        navigate(`/curso/${courseId}/${atividade._id}`)
                      }
                      variant="outlined"
                      startIcon={<AiFillPlusSquare />}
                    >
                      Mais Detalhes
                    </Button>
                    {perfil === "aluno" && (
                      <img
                        src={monstros[0]}
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
