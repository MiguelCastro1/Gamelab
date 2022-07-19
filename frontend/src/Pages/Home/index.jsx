import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsKanban } from "react-icons/bs";
import {VscBellDot} from 'react-icons/vsc'
import {FcHome} from "react-icons/fc";
import {IoSchoolOutline } from "react-icons/io5";
import HeaderHome from "../../components/HeaderHome";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import imageAluno from "../../assets/animacao_megaman_-running.gif";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import Button from '@mui/material/Button';
import ContentHome from "../../components/ContentHome";
import Kanban from "../../components/Kanban";
import ProcurarCurso from "../../components/ProcurarCurso";
import CriarCurso from "../../components/CriarCurso";
import Avisos from "../../components/Avisos";




function Home() {
  const [date, setDate] = useState(new Date());
  const [pagina, setPagina] = useState("home");
  const [searchString, setSearchString] = useState("");
  const {perfil} = localStorage.getItem("gamelab") ? JSON.parse(localStorage.getItem("gamelab")): null;
  const [resultados, setResultados] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const {url} = useParams();
  //const url = window.location.href;
  //console.log(url);
  
  useEffect(() => {
    try {
  
      if( perfil === "professor"){
        api.get("/cursos/professor/MeusCursos")
        .then((data) => {
          setResultados(data.data.doc);
         // if(url !== undefined)
         //   setPagina(url);
         // else
            setPagina("home");

          console.log('done');
        })
        .catch(err => console.log(err))
      }else{// if perfil == aluno
        api.get("/cursos/aluno/MeusCursos")
        .then((data) => {
          setResultados(data.data.doc);
   
         // if(url !== undefined)
         //   setPagina(url);
         // else
            setPagina("home");

          console.log('done')
        })
        .catch(err => console.log(err))
      }
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
             {pagina === 'home' && (
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
             )}
              {pagina !== 'home' && (
                 <Button  onClick={() => setPagina('home')} variant="outlined" startIcon={<FcHome /> }>
                 Home
                 </Button>
              )}
              {pagina !== 'kanban' && (
                <Button onClick={() => setPagina('kanban')}  variant="outlined" startIcon={<BsKanban />}>
                  Meu Kanban 
                </Button>
              )}
               {pagina !== 'avisos' &&  perfil === 'aluno' && (
                 <Button  onClick={() => setPagina('avisos')} variant="outlined" startIcon={<VscBellDot /> }>
                 Avisos
                 </Button>
              )}
              {pagina !== 'procurar-curso' &&  perfil === 'aluno'  && (
                  <Button  onClick={() => setPagina('procurar-curso')} variant="outlined" startIcon={<IoSchoolOutline /> }>
                    Procurar Curso
                  </Button>
              )}
              {pagina !== 'cadastrar-curso' &&  perfil === 'professor'  && (
                <Button  onClick={() => setPagina('cadastrar-curso')} variant="outlined" startIcon={<IoSchoolOutline /> }>
                    Cadastrar 
                 </Button>
              )}
            </ul>
          </div>

          <div className={styles.feed}>
            {pagina === 'home' && (searchString === '' ?  
            <ContentHome resultados={resultados} /> : <ContentHome resultados={searchResults} />)}
            {pagina === 'kanban' && <Kanban />}
            {pagina === 'procurar-curso' && <ProcurarCurso />}
            {pagina === 'cadastrar-curso' && <CriarCurso />}
            {pagina === 'avisos' && <Avisos />}
          </div>

          <div className={styles.sideBarRight}>
            {perfil === "aluno" && (
              <div className={styles.perfil}>
                <h3> Perfil </h3>
                <div className={styles.gamificacao}>
                  <img
                    src={imageAluno}
                    alt="Personagem"  
                    width={350}
                    height={250}
                  />
                  <div>
                    <span>Level: </span>
                    <span>1</span>
                  </div>
                </div>
                <ProgressBar progressBar={2} />
              </div>
            )}
            <div className={styles.calendario}>
              <h3>Calendário</h3>
              <Calendar
                className={styles.reactCalendar}
                onChange={setDate}
                value={date}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
