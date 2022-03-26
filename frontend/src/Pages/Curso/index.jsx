import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsKanban, BsCalendarCheck} from "react-icons/bs";
import {FiHome} from "react-icons/fi"
import HeaderHome from "../../components/HeaderHome";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import Input from "../../components/Input";
import { getToken } from "../../services/auth";


function Curso() {

  let { id, perfil } = getToken() ? JSON.parse(getToken()) : null;
 
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
                <h1> Curso</h1>
            </div>

            <div className={styles.sideBarRight}>
            <div className={styles.perfil}>
                <h3> Dados da turma </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Curso;
