import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsKanban } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";
import HeaderHome from "../../components/HeaderHome";
import BoxTurma from "../../components/BoxTurma";
import Calendar from "react-calendar";
import styles from "./styles.module.scss";
import imageAluno from "../../assets/Aluno_Personagem2.png";
import api from "../../services/axios";
import { useTypePerfil } from "../../Context/PerfilContext";

function Home() {
  const [date, setDate] = useState(new Date());
  const [searchString, setSearchString] = useState("");
  const [resultados, setResultados] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const {perfil, setPerfil }  = useTypePerfil();

  // Exemplos **Retirar quando Back tiver com daddo
  const turma1 = {
    Id: "1",
    nomeTurma: "Redes de computadores",
    professor: "Matheus Matos",
    descricao:
      "Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex.",
  };
  const turma2 = {
    Id: "2",
    nomeTurma: "Prática em Engenharia de Software",
    professor: "Ana Oran",
    descricao:
      "Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex.",
  };
  const turma3 = {
    Id: "3",
    nomeTurma: "Programação Web",
    professor: "Davi Fernandes",
    descricao:
      "Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex.",
  };
  const turma4 = {
    Id: "4",
    nomeTurma: "Banco 2",
    professor: "Altigran Silva",
    descricao:
      "Vivamus vulputate, velit pulvinar accumsan mattis, massa eros rhoncus mi, eu fermentum sapien dui vitae tellus. Curabitur in sagittis ante, ut molestie ex.",
  };

  //Carregar turmas do backend (quando tiver com exemplos)
 /* useEffect(() => {
    try {
      api.get("/cursos", perfil)
      .then((data) => {
        setResultados(data);
        console.log('done')
      })
      .catch(err => console.log(err))
    }catch (error) {
      console.log(error);
    }
  }, []);*/

  //retirar depois
  useEffect(() => {
    //ao carregar página carrega todas as turmas 
    console.log(perfil);
    let turmas = [];
    turmas.push(turma1);
    turmas.push(turma2);
    turmas.push(turma3);
    turmas.push(turma4);
    setResultados(turmas);
  }, []);

  useEffect(() => {
    //ao mudar string de busca, altera as turmas na home
    setSearchResults(
      resultados.filter((turma) =>
        turma.nomeTurma.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [searchString]);

  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sideBarLeft}>
            <ul>
              <li>
                <input
                  onChange={(e) => setSearchString(e.target.value)}
                  value={searchString}
                  placeholder="Buscar turma"
                />
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
              <Link to='/kanban'>  Meu Kanban <BsKanban size={20}/> </Link>
              </li>
              <li>
               <Link to='/criar-curso'> {perfil.perfil === "aluno" ? 'Procurar Turma':'Criar Turma'} <IoSchoolOutline size={20}/>{" "} </Link>
              </li>
            </ul>
          </div>

          <div className={styles.feed}>
            <header>
              <h1>Minhas turmas</h1>
            </header>
            <div>
              {searchString == "" //If
                ? resultados.map((turma) => (
                    <Link key={turma.Id} to='/curso'>
                      <BoxTurma
                        nomeTurma={turma.nomeTurma}
                        professor={turma.professor}
                        descricao={turma.descricao}
                      />
                    </Link>
                  ))
                : // Else
                  searchResults.map((turma) => (
                    <Link key={turma.Id} to='/curso'>
                      <BoxTurma
                        nomeTurma={turma.nomeTurma}
                        professor={turma.professor}
                        descricao={turma.descricao}
                      />
                    </Link>
                  ))}
            </div>
          </div>

          <div className={styles.sideBarRight}>
            <ul>
             {perfil.perfil === "aluno" && 
             <li  className={styles.avisos}>
              <h3 > Perfil </h3>
              <img src={imageAluno} alt="Nada"  width={350} height={250}/>
              </li> 
              }
              <li>
                <h3>Calendário</h3>
                <Calendar
                  className={styles.reactCalendar}
                  onChange={setDate}
                  value={date}
                />
                </li>
              {perfil.perfil === "aluno" &&
              <li className={styles.avisos}>
                <h3>Avisos</h3>
                <h4>Sem avisos</h4>
              </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
