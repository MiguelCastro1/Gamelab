import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import imgUser from "../../assets/foto_prof.svg";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

function HeaderHome() {
  let navigate = useNavigate();
  const [scrollY, setScrollY] = useState(false);

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
        <h1>GameLab</h1>
        <div className={styles.areaUser}>
          <p
            // className="dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Matheus Matos
          </p>
          <img src={imgUser} alt="usuário" />
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
            style={{ boxShadow: "var(--sombra" }}
          >
            <li>
              <p>
                <FiUser size=".9rem" /> Perfil
              </p>
              <p
                onClick={() => {
                  localStorage.removeItem("auth-axes-streaming");
                  navigate("/login");
                }}
              >
                <FiLogOut size=".9rem" /> Sair
              </p>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
