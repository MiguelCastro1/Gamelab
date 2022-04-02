import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { VscBellDot } from "react-icons/vsc";
import { getToken } from "../../services/auth";
import api from "../../services/axios";

function HeaderHome() {
  let navigate = useNavigate();
  const [imgUser, setImgUser] = useState("");
  let { id, nome, perfil } = getToken() ? JSON.parse(getToken()) : null;

  useEffect(() => {
    async function fetchImage() {
      let {
        data: { image },
      } = await api.get(`/usuarios/avatar/${id}`);
      setImgUser(image);
    }
    fetchImage();
  }, []);

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link to="/">
          <h1>GameLab</h1>
        </Link>
        <div className={styles.areaUser}>
          {perfil === "aluno" && (
            <p style={{ marginRight: ".7rem" }}>
              <Link to="/avisos">
                Avisos <VscBellDot size={18} />
              </Link>
            </p>
          )}
          <p
            // className="dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {nome}
          </p>
          <img
            src={`http://localhost:5000/public/avatar/${imgUser}`}
            alt="usuário"
          />
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
            style={{ boxShadow: "var(--sombra" }}
          >
            <li>
              <p
                onClick={() => {
                  navigate(`/perfil/${id}`);
                }}
              >
                <FiUser size=".9rem" /> Perfil
              </p>
              <p
                onClick={() => {
                  localStorage.removeItem("gamelab");
                  // setPerfil({});
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
