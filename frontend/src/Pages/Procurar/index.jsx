import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BiSearch} from "react-icons/bi";
import { BsChevronCompactLeft, BsKanban, BsFilter, BsCalendarCheck} from "react-icons/bs";
import {FcHome} from "react-icons/fc";
import {FaDoorOpen} from "react-icons/fa"
import HeaderHome from "../../components/HeaderHome";
import BoxTurmaEnroll from "../../components/BoxTurmaEnroll";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import imageAluno from "../../assets/animacao_megaman_-running.gif";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import { toast } from 'react-toastify';



function Procurar() {
  const [date, setDate] = useState(new Date());
  const [searchString, setSearchString] = useState("");
  const [resultados, setResultados] = useState([]);
  const [filterResults, SetfilterResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [titulo, setTitulo] = useState("Resultados: Ativos")
  let {id} = localStorage.getItem("gamelab")? JSON.parse(localStorage.getItem("gamelab")): null;
  
  useEffect(() => {
    try {
      console.log('begin')
      api.get("/cursos/procurar-curso")
      .then((data) => {
        //console.log(data.data.results)
        setResultados(data.data.results);
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
      filterResults.filter((turma) =>
        turma.nomeCurso.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [searchString]);

  useEffect(() => {
   //setSearchResults(resultados.filter((turma) => resultados.Ativo))
   SetfilterResults(resultados.filter((turma) => turma.Ativo))
  }, [resultados]);

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
                  <FcHome size={20} />{" "}
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
                    SetfilterResults(resultados.filter((turma) => !turma.Ativo))
                   
                  }}
                >
                  Inativos
                </p>
                <p
                  onClick={() => {
                    setTitulo("Resultados: Ativos")
                    SetfilterResults(resultados.filter((turma) => turma.Ativo))
                  }}
                >
                  Ativos
                </p>
                <p
                  onClick={() => {
                    setTitulo("Resultados: Todos")
                    SetfilterResults(resultados)
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
                    SetfilterResults(resultados.filter((turma) => turma.createdAt.includes('2021')))
                  }}
                >
                  2021
                </p>
                <p
                  onClick={() => {
                    // setSearchResults(!resultado.ativo)
                    setTitulo("Resultados: 2022")
                    SetfilterResults(resultados.filter((turma) => turma.createdAt.includes('2022')))
                  }}
                >
                  2022
                </p>  
                </li>
            </ul>
          </div>

            <div>
              <h2 className={styles.titulo}>  {titulo} </h2>
              {searchString === '' ? (
                filterResults.map((turma) => (
                  <div key={turma._id}>
                    <BoxTurmaEnroll 
                      course_id = {turma._id}
                      nomeTurma={turma.nomeCurso}
                      professor={turma.autorEmail}
                      descricao={turma.descricao}
                      senha_curso={turma.senha}
                    />
                  </div>
                )))
                :
                (searchResults.map((turma) => (
                  <div key={turma._id}>
                    <BoxTurmaEnroll 
                      course_id = {turma._id}
                      nomeTurma={turma.nomeCurso}
                      professor={turma.autorEmail}
                      descricao={turma.descricao}
                      senha_curso={turma.senha}
                    />
                  </div>
                )))
              }
            </div>
            {}
          </div>


          <div className={styles.sideBarRight}>
            <ul>
                <li>
                  <h3> Perfil </h3>
                  <section className={styles.userName}>
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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Procurar;
