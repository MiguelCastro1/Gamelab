import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsKanban } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";
import HeaderHome from "../../components/HeaderHome";
import BoxTurma from "../../components/BoxTurma";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";

function HomeProfessor() {
  const turma1 = {
    Id: '1',
    nomeTurma:"Redes de computadores",
    professor:"Matheus Matos",
    descricao:"Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex."
  }
  const turma2 = {
    Id: '2',
    nomeTurma:"Prática em Engenharia de Softwewa",
    professor:"Ana Oran",
    descricao:"Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex."
  }
  const turma3 = {
    Id: '3',
    nomeTurma:"Programação Web",
    professor:"Davi Fernandex",
    descricao:"Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex."
  }
  const turma4 = {
    Id: '4',
    nomeTurma:"Banco 2",
    professor:"Altigran Silva",
    descricao:"Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex."
  }

  const [date, setDate] = useState(new Date());
  const [searchString, setSearchString ] = useState('');
  const [res, setRes] = useState([]);

  useEffect(() => {
    let turmas = []
    turmas.push(turma1)
    turmas.push(turma2)
    turmas.push(turma3)
    turmas.push(turma4)

    setRes(turmas)
  }, [])

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
            </header>
<<<<<<< HEAD
            <div>
            {res.map(turma =>   
               <Link key={turma.Id} to={turma.Id}>
                <BoxTurma
                nomeTurma={turma.nomeTurma}
                professor={turma.professor}
                descricao={turma.descricao}/>
              </Link>)}
            </div>
=======
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

>>>>>>> cde659d438faf6e9067c4b3cea3e8dcf22e07e67
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
