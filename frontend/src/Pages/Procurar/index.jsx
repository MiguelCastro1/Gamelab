import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BiSearch} from "react-icons/bi";
import { BsChevronCompactLeft, BsKanban, BsFilter, BsCalendarCheck} from "react-icons/bs";
import {FiHome} from "react-icons/fi"
import {FaDoorOpen} from "react-icons/fa"
import HeaderHome from "../../components/HeaderHome";
import BoxTurmaEnroll from "../../components/BoxTurmaEnroll";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import imageAluno from "../../assets/animacao_megaman_-running.gif";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";

function Procurar() {
  const [date, setDate] = useState(new Date());
  const [searchString, setSearchString] = useState("");
  const [resultados, setResultados] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [titulo, setTitulo] = useState("Resultados: Todos")
  let {id} = localStorage.getItem("gamelab")
    ? JSON.parse(localStorage.getItem("gamelab"))
    : null;
  
  useEffect(() => {
    try {
      api.get("/cursos", id)
      .then((data) => {
        setResultados(data.data.doc);
        //console.log(data.data.doc)
        console.log('done')
      })
      .catch(err => console.log(err))
    }catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    //ao mudar string de busca, altera as turmas na home
    setSearchResults(
      resultados.filter((turma) =>
        turma.nomeCurso.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [searchString]);

  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sideBarLeft}>
            <ul>
              <li></li>
              <li>
                <Link to="/kanban">
                  {" "}
                  Meu Kanban <BsKanban size={20} />{" "}
                </Link>
              </li>
              <li>
                <Link to="/">
                  {" "}
                  Home
                  <FiHome size={20} />{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.feed}>
            <header>
              <h1>Procurar Turma</h1>
            </header>
            <input
                  onChange={(e) => setSearchString(e.target.value)}
                  value={searchString}
                  placeholder="Nome ou Código da turma"
                />

           <div className={styles.filtros}>
           <p  
                // className="dropdown-toggle"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false" >
              <BsFilter /> {" "}Filtros
            </p>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
              style={{ boxShadow: "var(--sombra" }}
            >
              <li>
                <p 
                  onClick={() => {
                  setTitulo("Resultados: Inativos")
                 // setSearchResults(!resultado.ativo)
                  }}
                >
                  Inativos
                </p>
                <p
                  onClick={() => {
                   // setSearchResults(resultado.ativo)
                    setTitulo("Resultados: Ativos")
                  }}
                >
                  Ativos
                </p>
                <p
                  onClick={() => {
                    searchResults(resultados)
                    setTitulo("Resultados: Todos")
                  }}
                >
                  Todos
                </p>
              </li>
            </ul>
          
            <p 
                // className="dropdown-toggle"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false" >
            <BsCalendarCheck /> {"   "}Ano
            </p>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
              style={{ boxShadow: "var(--sombra" }}
            >
              <li>
                <p
                  onClick={() => {
                    // setSearchResults(resultado.ativo)
                    setTitulo("Resultados: 2021")
                  }}
                >
                  2021
                </p>
                <p
                  onClick={() => {
                    // setSearchResults(!resultado.ativo)
                    setTitulo("Resultados: 2022")
                  }}
                >
                  2022
                </p>  
                </li>
            </ul>
          </div>

            <div>
              <h2 className={styles.titulo}>  {titulo} </h2>
              {searchString == "" //If
                ?  (resultados.map((turma) => (
                  <div key={turma._id}>
                       <BoxTurmaEnroll 
                        id = {turma._id}
                        nomeTurma={turma.nomeCurso}
                        professor={turma.autorEmail}
                        descricao={turma.descricao}
                        senha={turma.senha}
                      />
                    </div>
                  ))
                 ) : (
                  searchResults.map((turma) => (
                    <div key={turma._id}>
                      <BoxTurmaEnroll 
                      id = {turma._id}
                      nomeTurma={turma.nomeCurso}
                      professor={turma.autorEmail}
                      descricao={turma.descricao}
                      senha={turma.senha}
                    />
                   </div>
                  )))}
            </div>
            {}
          </div>


          <div className={styles.sideBarRight}>
            <ul>
                <li>
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
                </li>
              <li className={styles.avisos}>
                <h3>Calendário</h3>
                <Calendar
                  className={styles.reactCalendar}
                  onChange={setDate}
                  value={date}
                />
              </li>
                <li className={styles.avisos}>
                  <h3>Avisos</h3>
                  <h4>Sem avisos</h4>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Procurar;
