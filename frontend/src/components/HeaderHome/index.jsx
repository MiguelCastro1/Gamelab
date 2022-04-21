import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useTypePerfil } from "../../Context/PerfilContext";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { VscBellDot } from "react-icons/vsc";
import { getToken } from "../../services/auth";
import api from "../../services/axios";

function HeaderHome() {
  let navigate = useNavigate();
  let { id, nome, perfil } = getToken() ? JSON.parse(getToken()) : null;
  const [imgUser, setImgUser] = useState("");
  const { flagResetImage } = useTypePerfil();

  useEffect(() => {
    async function fetchImage() {
      let {
        data: { image },
      } = await api.get(`/usuarios/avatar/${id}`);
      setImgUser(image);
    }
    fetchImage();
  }, [flagResetImage]);

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link to="/home">
          <h1>GameLab</h1>
        </Link>
        <div className={styles.areaUser}>
          <p
            // className="dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {nome}
          </p>
          <img
            src={`https://afternoon-tundra-10183.herokuapp.com/public/avatar/${imgUser}`}
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
