import { useState, useEffect } from "react";
import {  BsFilter, BsCalendarCheck} from "react-icons/bs";
import BoxTurmaEnroll from "../../components/BoxTurmaEnroll";
import styles from "./styles.module.scss";
import api from "../../services/axios";

function ProcurarCurso() {
  const [searchString, setSearchString] = useState("");
  const [resultados, setResultados] = useState([]);
  const [filterResults, SetfilterResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [titulo, setTitulo] = useState("Resultados: Ativos")

  useEffect(() => {
    try {
      api.get("/cursos/procurar-curso")
      .then((data) => {
        console.log(data.data.results)
        setResultados(data.data.results);
        console.log('done')
      })
      .catch(err => console.log(err))
    }catch (error) {
      console.log(error);
    }
  }, []);

 
  useEffect(() => {
    setSearchResults(
      filterResults.filter((turma) =>
        turma.nomeCurso.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [searchString]);

  useEffect(() => {
   SetfilterResults(resultados.filter((turma) => turma.Ativo))
  }, [resultados]);

  return (
    <>
      <div className={styles.feed}>
          <h1>Procurar Curso</h1>
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
          {false  && searchString === '' ? (
            filterResults.map((turma) => (
              <div key={turma._id}>
                <BoxTurmaEnroll 
                  course_id = {turma._id}
                  nomeTurma={turma.nomeCurso}
                  professor={turma.autorId.email}
                  descricao={turma.descricao}
                  img ={turma.userId.imageAvatar}
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
                  professor={turma.autorId.email}
                  img = {turma.autorId.imageAvatar}
                  descricao={turma.descricao}
                  senha_curso={turma.senha}
                />
              </div>
            )))
          }
        </div>
        {}
      </div>
    </>
  );
}

export default ProcurarCurso;
