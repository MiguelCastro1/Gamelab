import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsKanban, BsCalendarCheck} from "react-icons/bs";
import {FiHome} from "react-icons/fi"
import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import { getToken } from "../../services/auth";


function Avisos() {

  let { id } = getToken() ? JSON.parse(getToken()) : null;
 
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
                <h1> Avisos</h1>
            </div>



        </div>
      </div>
    </>
  );
}

export default Avisos;
