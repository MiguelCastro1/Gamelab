import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsKanban } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";
import HeaderHome from "../../components/HeaderHome";
import BoxTurma from "../../components/BoxTurma";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import imageAluno from "../../assets/animacao_megaman_-running.gif";
import api from "../../services/axios";
import { useTypePerfil } from "../../Context/PerfilContext";
import ProgressBar from "../../components/ProgressBar";
import { getToken } from "../../services/auth";

function Home() {
  const [date, setDate] = useState(new Date());
  const [searchString, setSearchString] = useState("");
  const [turmas, setTurmas] = useState([]);
  let { perfil } = getToken() ? JSON.parse(getToken()) : null;

  useEffect(() => {
    async function fetchTurma() {
      let { data } =
        perfil === "professor"
          ? await api.get(`/meuscursos?pesquisa=${searchString}`)
          : await api.get(`/cursos?pesquisa=${searchString}`);
      setTurmas([...data.doc]);
    }
    fetchTurma();
  }, [searchString]);

  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sideBarLeft}>
            <ul>
              <li>
                <input
                  onChange={(e) => setSearchString(e.target.value)}
                  value={searchString}
                  placeholder="Buscar turma"
                />
                <BiSearch
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: "10",
                  }}
                />
              </li>
              <li>
                <Link to="/kanban">
                  Meu Kanban <BsKanban size={20} />
                </Link>
              </li>
              <li>
                <Link to="/criar-curso">
                  {perfil.perfil === "aluno" ? "Procurar Turma" : "Criar Turma"}
                  <IoSchoolOutline size={20} />
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.feed}>
            <header>
              <h1>Minhas turmas</h1>
            </header>
            <div>
              {turmas.map(({ _id, autorEmail, descricao, materia }) => (
                <BoxTurma
                  nomeTurma={materia}
                  professor={autorEmail}
                  descricao={descricao}
                  key={_id}
                />
              ))}
            </div>
          </div>

          <div className={styles.sideBarRight}>
            {perfil === "aluno" && (
              <div className={styles.perfil}>
                <h3> Perfil </h3>
                <section className={styles.userName}>
                  <span>rodrigotaveiraa</span>
                </section>
                <div className={styles.gamificacao}>
                  <img
                    src={imageAluno}
                    alt="Personagem"
                    width={350}
                    height={250}
                  />
                  <div>
                    <span>Level: </span>
                    <span>2</span>
                  </div>
                </div>
                <ProgressBar progressBar={23} />
              </div>
            )}
            <div className={styles.calendario}>
              <h3>Calendário</h3>
              <Calendar
                className={styles.reactCalendar}
                onChange={setDate}
                value={date}
              />
              {/* {perfil === "aluno" && (
                <div>
                  <h3>Avisos</h3>
                  <h4>Sem avisos</h4>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
