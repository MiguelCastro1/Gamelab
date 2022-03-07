import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsKanban } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";
import HeaderHome from "../../components/HeaderHome";
import BoxTurma from "../../components/BoxTurma";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";

function HomeProfessor() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sideBarLeft}>
            <ul>
              <li>
                <input placeholder="Pesquisar turma" />
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
              <li>
                Meu Kanban <BsKanban />
              </li>
              <li>
                Criar turma <IoSchoolOutline />{" "}
              </li>
            </ul>
          </div>
          <div className={styles.feed}>
            <header>
              <h1>Minhas turmas</h1>
              <div>
                <button>Criar turma</button>
                <button>Meu Kanbam</button>
              </div>
            </header>
            <section className={styles.areaSearch}>
              <input placeholder="Pesquisar turma" />
              <BiSearch
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: "10",
                }}
              />
            </section>
            <Link to="login">
              <BoxTurma
                nomeTurma="Redes de computadores"
                professor="Matheus Matos"
                descricao="Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex."
              />
            </Link>
            <Link to="login">
              <BoxTurma
                nomeTurma="Redes de computadores"
                professor="Matheus Matos"
                descricao="Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex."
              />
            </Link>
            <Link to="login">
              <BoxTurma
                nomeTurma="Redes de computadores"
                professor="Matheus Matos"
                descricao="Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex."
              />
            </Link>

          </div>
          <div className={styles.sideBarRight}>
            <ul>
              <h3>Calendário</h3>
              <li>
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

export default HomeProfessor;
