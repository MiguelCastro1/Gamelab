import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";
import imgUser from "../../assets/foto_prof.svg";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import {VscBellDot} from "react-icons/vsc"
import { useTypePerfil } from "../../Context/PerfilContext";

function HeaderHome() {
  let navigate = useNavigate();
  const [scrollY, setScrollY] = useState(false);
  const {perfil,setPerfil} = useTypePerfil();

  // useEffect(() => {
  //   const scrollListener = () => {
  //     setScrollY(window.scrollY > 10 ? true : false);
  //   };

  //   window.addEventListener("scroll", scrollListener);

  //   return () => window.removeEventListener("scroll", scrollListener);
  // }, []);

  return (
    <header className={styles.container}>
      <div className={styles.content}>
      <Link to='/'> <h1>GameLab</h1> </Link>
        <div className={styles.areaUser}>
          <p
            // className="dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {perfil.nome}
          </p>
          <img src={imgUser} alt="usuário" />
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
            style={{ boxShadow: "var(--sombra" }}
          >
            <li>
              <p
              onClick={() => {
                  navigate("/perfil");
                }}
              >
                <FiUser size=".9rem" /> Perfil
              </p>
              <p
                onClick={() => {
                  localStorage.removeItem("gamelab");
                  setPerfil({})
                  navigate("/login");
                }}
              >
                <FiLogOut size=".9rem" /> Sair
              </p>
            </li>
          </ul>
          {perfil.perfil === "aluno" &&  
           <p><Link to='/avisos'> Avisos  <VscBellDot size={20} /> </Link></p>
          }
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
