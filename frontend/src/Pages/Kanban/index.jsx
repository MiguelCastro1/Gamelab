import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsKanban, BsCalendarCheck} from "react-icons/bs";
import { FcHome } from "react-icons/fc";
import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";
import api from "../../services/axios";
import ProgressBar from "../../components/ProgressBar";
import { getToken } from "../../services/auth";


function Kanban() {

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
                <Link to="/">
                  {" "}
                  Home
                  <FcHome size={20} />{" "}
                </Link>
              </li>
            </ul>
          </div>

            <div className={styles.feed}>
                <h1> Kanban</h1>
            </div>



        </div>
      </div>
    </>
  );
}

export default Kanban;
