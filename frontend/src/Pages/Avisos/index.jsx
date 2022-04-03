import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { BsKanban } from "react-icons/bs";
import {FcHome} from "react-icons/fc";
import {IoSchoolOutline } from "react-icons/io5";
import HeaderHome from "../../components/HeaderHome";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import imageAluno from "../../assets/animacao_megaman_-running.gif";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import Button from '@mui/material/Button';


function Avisos() {
  const [date, setDate] = useState(new Date());
  const [pagina, setPagina] = useState('');
  const [searchString, setSearchString] = useState("");
  const {perfil} = localStorage.getItem("gamelab") ? JSON.parse(localStorage.getItem("gamelab")): null;

 
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

              <Button onClick={() => setPagina('kanban')}  variant="outlined" startIcon={<BsKanban />}>
                Meu Kanban 
              </Button>
              {pagina === 'home' ? (
                perfil === 'aluno' ? (
                  <Button  onClick={() => setPagina('procurar-curso')} variant="outlined" startIcon={<IoSchoolOutline /> }>
                    Procurar Curso
                  </Button>
                ) : (
                  <Button  onClick={() => setPagina('cadastrar-curso')} variant="outlined" startIcon={<IoSchoolOutline /> }>
                    Cadastrar 
                  </Button>
                )) : (
                  <Button  onClick={() => setPagina('home')} variant="outlined" startIcon={<FcHome /> }>
                  Home
                  </Button>
                )}
            </ul>
          </div>

          <div className={styles.feed}>
                  <h1> Meus Avisos</h1>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Avisos;
