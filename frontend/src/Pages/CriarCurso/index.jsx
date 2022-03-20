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
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";

function CriarCurso() {
  const [date, setDate] = useState(new Date());
  const [searchString, setSearchString] = useState("");

  let {id} = localStorage.getItem("gamelab")
    ? JSON.parse(localStorage.getItem("gamelab"))
    : null;
  
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
              <h1>Criar Turma</h1>
            </header>
            <input
                  onChange={(e) => setSearchString(e.target.value)}
                  value={searchString}
                  placeholder="Nome ou Código da turma"
                />
            <div>
    
            </div>
            {}
          </div>


          <div className={styles.sideBarRight}>
            <ul>
               
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

export default CriarCurso;
